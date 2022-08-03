import crypto from 'crypto'
const fs = require('fs');
import moment from 'moment';

import Centroid from '../../Database/models/Centroid';


import HiveStorage from '../storage/HiveStorage';
const storage = new HiveStorage
import initialization from '../storage/GenesisFolder'




class Hive {

    constructor() {
    }

    updateCentroid(data) {
        return new Promise(async (resolve, rejects) => {
            try {
                storage.saveData((data), 'data', 'spine', () => {
                    resolve(data)
                })
            } catch (err) {
                rejects("Failed to update Centroid " + err)
            }
        })
    }

    calculateHash(uuid, data, timestamp) {
        return new Promise(async (resolve, rejects) => {
            data = JSON.stringify(data)
            if (!uuid) rejects("Missing data")
            if (!data) rejects("Missing data")
            if (!timestamp) rejects("Missing data")
            const hash = await crypto
                .createHash('sha256')
                .update(uuid + data + timestamp)
                .digest('hex')
            if (hash === undefined) rejects(null)
            resolve(hash)
        }).catch((err) => { rejects(err) })
    }

    createCentroid() {
        return new Promise(async (resolve, rejects) => {
            let date = moment(Date.now()).format()
            date = date.toString()
            const genesis_data = {
                0: {
                    "uuid": "0",
                    "walletid": "genesis",
                    "timestamp": date,
                    "ref": "root",
                    "hash": "empty",
                    "body":
                        { "Data": "Genesis Block", 'Auther': "Tanbin Hassan Bappi" }
                    ,
                    "amount": "0",
                    "signatue": "Genesis"
                }
            }
            console.log("Genius Block Data Genarated");
            initialization(genesis_data, (data) => {
                console.log("initialization replay with ");

            }).then(() => {
                console.log("Database Entry");
                const { uuid, walletid, timestamp, ref, hash, body, amount, signatue } = genesis_data['0']
                let _body = JSON.stringify(body)
                Centroid.create({ uuid, walletid, timestamp, ref, hash, body: _body, amount, sign: signatue }, (data) => { resolve(data) })
            })
                .catch((err) => {
                    rejects(err)
                })
        })
    }


    async get_storage_data() {
        try {
            let _spine = await storage.getData()
            _spine = JSON.parse(_spine)
            return _spine
        } catch (err) {
            return "Failed to get data. " + err
        }
    }
    async get_db_data() {
        return new Promise((resolve, reject) => {

            Centroid.findAll().then(_spine => {
                resolve(_spine)
            }).catch(e => {
                console.error(e)
                reject(e)
            })
        })

    }


    async pushCentroid(publickey, privateKey, body_data, amount = 0) {


        const pro = new Promise(async (resolve, rejects) => {
            if (!publickey) rejects("Null value found.")
            if (!privateKey) rejects("Null value found.")
            body_data = JSON.stringify(body_data)

            // privateKey = Buffer.from(privateKey)
            console.log(typeof body_data);
            let sign = crypto.sign("sha512", body_data, privateKey)
            sign = sign.toString('base64')
            sign = JSON.stringify(sign)
            /*
             Load Centroid
            */
            let data = await this.getCentroid()
            if (!data) {
                rejects("Unable to load Centroid")
            }
            /* Centroid Length */
            let len = Object.keys(data)
            len = len.length - 1
            /* 
                 Working with previous block
             */
            let previous_block = data[len]

            // Security
            if (len != 0) {
                let temp_hash = previous_block.ref
                const _len_ref_block = len - 1
                let previous_ref_block = data[_len_ref_block]
                let _hash = await this.calculateHash(previous_ref_block.uuid, previous_ref_block.body, previous_ref_block.timestamp).catch((err) => {
                    rejects(err)
                })
                if (_hash != temp_hash) {
                    console.log({ "Error": "Hash Mismatch", "hash": _hash, "ref": temp_hash });
                    rejects({ "Error": "Hash Mismatch", "hash": _hash, "ref": temp_hash })
                }

                if (previous_block.uuid === publickey) {
                    console.log({ "Error": "Hash Mismatch", "hash": _hash, "ref": temp_hash });
                    rejects("User already present.")
                }
            }
            /*
              Creating New Block
            */
            let block_no = len + 1
            let date = moment(Date.now()).format()
            date = date.toString() //making date string

            let new_block = {}
            new_block[len + 1] = {
                "uuid": block_no,
                "walletid": publickey,
                "timestamp": date,
                "ref": await this.calculateHash(previous_block.uuid, previous_block.body, previous_block.timestamp).catch((err) => {
                    rejects(err)
                }),
                "hash": await this.calculateHash(publickey, body_data, date).catch((err) => {
                    rejects(err)
                }),
                "body": body_data,
                "amount": amount,
                "status": "1",
                "signature": sign.toString('base64')
            }
            const _body = JSON.stringify(body_data)
            Centroid.create({
                id: block_no, walletid: publickey, timestamp: date, ref: await this.calculateHash(previous_block.uuid, previous_block.body, previous_block.timestamp).catch((err) => {
                    rejects(err)
                }), hash: await this.calculateHash(publickey, body_data, date).catch((err) => {
                    rejects(err)
                }), body: _body, amount: amount, sign: sign.toString('base64')
            }, (data) => { resolve(data) })

            Object.assign(data, new_block) //Join with old block
            console.log(data);
            data = this.updateCentroid(data) //Update source file

            resolve(data)


        }).catch((err) => { return err })
        console.log(await pro);
        return pro
    }

    async search(param) {
        // const user = `"uuid": "${param}"`
        let data = await this.getCentroid()
        data = Object.values(data).find((obj) => { return obj.uuid == param })
        return data
    }

}

export default Hive;
