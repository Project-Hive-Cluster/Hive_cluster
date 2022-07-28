import { json } from 'express'
const fs = require('fs');
const path = require('path');
import { encrypt, decrypt } from './security'
import crypto from 'crypto'
import moment from 'moment';
import { resolve } from 'path';
import { async } from 'regenerator-runtime';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const hash_size = 2

class Hive {


    constructor() {
    }
    async updateSpine(data) {

        try {
            data = JSON.stringify(data)
            let encrypt_data = encrypt(data)
            encrypt_data = JSON.stringify(encrypt_data)
            fs.writeFileSync(path.resolve(__dirname) + 'ProgramData\\Hive Cluster\\data' + 'spine.aura', encrypt_data, 'utf8')
        } catch (err) {
            return err
        }
        return "Success"

    }

    calculateHash(uuid, data, timestamp) {
        return new Promise(async (resolve, reject) => {
            data = JSON.stringify(data)
            if (!uuid) reject("Missing data")
            if (!data) reject("Missing data")
            if (!timestamp) reject("Missing data")
            const hash = await crypto.createHash('sha256').update(uuid + data + timestamp).digest('hex')
            if (hash === undefined) reject(null)
            resolve(hash)
        }).catch((err) => { reject(err) })
    }

    async createSpine() {
        console.log("A request to create Spine of your Hive Cluster");
        let date = moment(Date.now()).format()
        date = date.toString()
        const genius_block = {
            0: {
                "uuid": "genius",
                "timestamp": date,
                "previous_node_id": "null",
                "ref": "null",
                "body": [
                    { "Data": "Genius Block" }
                ],
                "status": "1",
                "signatue": "null"
            }
        }
        try {
            this.updateSpine(genius_block)
        } catch (err) {
            return err
        }
        return "Success"

    }


    async getSpine() {
        const _spine = await fs.readFileSync(path.resolve(__dirname) + 'ProgramData\\Hive Cluster\\data' + 'spine.aura', 'utf8')
        let data = JSON.parse(_spine)
        data = await decrypt(data)
        data = JSON.parse(data)
        return data
    }


    pushSpine(publickey, body_data) {

        return new Promise(async (resolve, reject) => {


            if (!publickey) reject("Null value found.")
            if (!body_data) reject("Body cannot be null.")

            /*
             Load Spine
            */
            let data = await this.getSpine()
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
                    reject(err)
                })
                if (_hash != temp_hash) {
                    reject({ "Error": "Hash Mismatch", "hash": _hash, "ref": temp_hash })
                }
                if (previous_block.uuid === publickey) {
                    reject("User already present.")
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
                "uuid": publickey,
                "timestamp": date,
                "ref": await this.calculateHash(previous_block.uuid, previous_block.body, previous_block.timestamp).catch((err) => {
                    reject(err)
                }),
                "hash": await this.calculateHash(publickey, body_data, date).catch((err) => {
                    reject(err)
                }),
                "body": body_data,
                "status": "1",
                "signatue": "null"
            }
            Object.assign(data, new_block) //Join with old block
            this.updateSpine(data) //Update source file
            resolve(data)

        }).catch((err) => { return err })
    }


    async search(param) {
        // const user = `"uuid": "${param}"`
        let data = await this.getSpine()
        data = Object.values(data).find((obj) => { return obj.uuid == param })

        return data

    }


    // addChild(params) {
    //     console.log("hi");
    // }

    // pushChild(publickey, privatekey, data) {
    //     console.log("hi");
    // }

}

export default Hive;