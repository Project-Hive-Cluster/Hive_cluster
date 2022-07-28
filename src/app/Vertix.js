import { json } from 'express'
const fs = require('fs');
const path = require('path');
import { encrypt, decrypt } from './security'
import crypto from 'crypto'
import moment from 'moment';
import Hive from './Hive';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const hash_size = 2

class Vertix {


    constructor() {
        this.publicid = uuid
    }
    async updateVertix(data) {

        try {
            data = JSON.stringify(data)
            let encrypt_data = encrypt(data)
            encrypt_data = JSON.stringify(encrypt_data)
            fs.writeFileSync(path.resolve(__dirname) + 'ProgramData\\Hive Cluster\\data\\cluster' + `${uuid}.aura`, encrypt_data, 'utf8')
        } catch (err) {
            return err
        }
        return "Success"

    }

    calculateHash(parante, data, timestamp, dir_vartix_in, dir_vartix_out) {
        if (!parante || !data || !timestamp) return "Missing data"
        return crypto.createHash('sha256').update(parante + dir_vartix_in + dir_vartix_out + data + timestamp).digest('hex');
    }

    async loadVertix() {
        const _node = await fs.readFileSync(path.resolve(__dirname) + 'ProgramData\\Hive Cluster\\data\\cluster' + `${uuid}.aura`, 'utf8')
        let data = JSON.parse(_node)
        data = await decrypt(data)
        data = JSON.parse(data)
        return data
    }

    async addVertix(publickey, body_data) {
        try {
            /*
             Load Vertix
            */
            let data = await this.loadVertix()
            /* Vertix Length */
            let len = Object.keys(data)
            len = len.length - 1

            let previous_block = ""

            if (len === 0 || !len) {
                previous_block = Hive.getVertix

            } else {

                previous_block = data[len]
            }

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
                "ref": this.createVertix(previous_block.uuid, previous_block.body, previous_block.timestamp),
                "hash": this.createVertix(publickey, body_data, date),
                "body": body_data,
                "signatue": "null"
            }
            Object.assign(data, new_block) //Join with old block
            this.updateVertix(data) //Update source file
            return data
        } catch (e) { console.log(e); }
    }









    pushVertix(params) {
        console.log("hi");
    }
    getVertix(params) {
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