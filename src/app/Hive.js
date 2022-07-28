import { json } from 'express'
const fs = require('fs');
const path = require('path');
import { encrypt, decrypt } from './security'
import crypto from 'crypto'
import moment from 'moment';
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
        if (!uuid || !data || !timestamp) return "Missing data"
        return crypto.createHash('sha256').update(uuid + data + timestamp).digest('hex');
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


    async loadSpine() {
        const _spine = await fs.readFileSync(path.resolve(__dirname) + 'ProgramData\\Hive Cluster\\data' + 'spine.aura', 'utf8')
        let data = JSON.parse(_spine)
        data = await decrypt(data)
        data = JSON.parse(data)
        return data
    }
    async loadUser(param) {
        // const user = `"uuid": "${param}"`
        let data = await this.loadSpine()

        data.map((data) => {
            console.log(data);
        })
        // return data.filter((data) => { return data.uuid == param })
    }

    async addSpine(publickey, body_data) {
        try {
            /*
             Load Spine
            */
            let data = await this.loadSpine()
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
                let _hash = this.calculateHash(previous_ref_block.uuid, previous_ref_block.body, previous_ref_block.timestamp)
                if (_hash != temp_hash) {
                    console.log("Hash Mismatch");
                    return "Hash Mismatch"
                }
                if (previous_block.uuid === publickey) {
                    console.log("Hash Mismatch");
                    return "User already present."
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
                "ref": this.createSpine(previous_block.uuid, previous_block.body, previous_block.timestamp),
                "hash": this.createSpine(publickey, body_data, date),
                "body": body_data,
                "signatue": "null"
            }
            Object.assign(data, new_block) //Join with old block
            this.updateSpine(data) //Update source file
            return data
        } catch (e) { console.log(e); }
    }









    pushSpine(params) {
        console.log("hi");
    }
    getSpine(params) {
        // let spine = JSON.stringify(spine)
        // return spine
        console.log("hi");
    }
    addChild(params) {
        console.log("hi");
    }
    pushChild(publickey, privatekey, data) {
        console.log("hi");
    }

}

export default Hive;