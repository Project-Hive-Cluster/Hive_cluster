import crypto from 'crypto'
const fs = require('fs');
import moment from 'moment';
import HiveStorage from './HiveStorage';
import { GenesisFolder } from './HiveStorage';
const storage = new HiveStorage
const gFolder = new GenesisFolder




class Hive {

    constructor() {
    }

    updateSpine(data) {
        return new Promise(async (resolve, rejects) => {
            try {
                storage.saveData((data), 'data', 'spine', () => {
                    resolve(data)
                })
            } catch (err) {
                rejects("Failed to update Spine " + err)
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

    createSpine() {

        return new Promise(async (resolve, rejects) => {
            let date = moment(Date.now()).format()
            date = date.toString()
            const genesis_data = {
                0: {
                    "uuid": "genesis ",
                    "timestamp": date,
                    "body":
                        { "Data": "Genesis Block", 'Auther': "Tanbin Hassan Bappi" }
                    ,
                    "amount": "0",
                    "signatue": "null"
                }
            }
            console.log("Genius Block Genarated");
            console.log(genesis_data);

            resolve(gFolder.initialization(genesis_data))
        })
    }


    async getSpine() {
        try {
            let _spine = await storage.getData()
            _spine = JSON.parse(_spine)
            return _spine
        } catch (err) {
            return "Failed to get data. " + err
        }
    }


    async pushSpine(publickey, privateKey, body_data, amount = 0) {


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
             Load Spine
            */
            let data = await this.getSpine()
            if (!data) {
                rejects("Unable to load Spine")
            }
            /* Spine Length */
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

            console.log(new_block);
            console.log(typeof new_block);
            console.log(data);
            console.log(typeof data);

            Object.assign(data, new_block) //Join with old block
            console.log(data);
            data = this.updateSpine(data) //Update source file

            resolve(data)


        }).catch((err) => { return err })
        console.log(await pro);
        return pro
    }

    async search(param) {
        // const user = `"uuid": "${param}"`
        let data = await this.getSpine()
        data = Object.values(data).find((obj) => { return obj.uuid == param })
        return data
    }

}

export default Hive;
