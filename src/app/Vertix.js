import { json } from 'express'
const fs = require('fs');
const path = require('path');
import { encrypt, decrypt } from './security'
import crypto from 'crypto'
import moment from 'moment';
import Hive from './hive/Hive';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const hash_size = 2

class Vertix {


    constructor() {
        this.publicid = uuid
    }
    async update(data) {

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

    async get() {
        const _node = await fs.readFileSync(path.resolve(__dirname) + 'ProgramData\\Hive Cluster\\data\\cluster' + `${uuid}.aura`, 'utf8')
        let data = JSON.parse(_node)
        data = await decrypt(data)
        data = JSON.parse(data)
        return data
    }

    async insart(publickey, body_data, dir_vartix_in, dir_vartix_out) {
        try {
            /*
             Load Vertix
            */
            let data = await this.get()
            /* Vertix Length */
            let len = Object.keys(data)
            len = len.length - 1

            let previous_block = ""
            let parent = Hive.search(publickey)
            let _ref = ""
            this.calculateHash(previous_block.uuid, previous_block.body, previous_block.timestamp)
            if (len === 0 || !len) {
                previous_block = parent
                _ref = parent.hash
            } else {
                previous_block = data[len]
                _ref = this.calculateHash(previous_block.uuid, previous_block.body, previous_block.timestamp)
                _parent = parent.hash
            }

            // Security
            // if (len != 0) {
            //     let temp_hash = previous_block.ref
            //     const _len_ref_block = len - 1
            //     let previous_ref_block = data[_len_ref_block]
            //     let _hash = this.calculateHash(previous_ref_block.uuid, previous_ref_block.body, previous_ref_block.timestamp)
            //     if (_hash != temp_hash) {
            //         console.log("Hash Mismatch");
            //         return "Hash Mismatch"
            //     }
            //     if (previous_block.uuid === publickey) {
            //         console.log("Hash Mismatch");
            //         return "User already present."
            //     }
            // }


            /*
              Creating New Block
            */
            let block_no = len + 1
            let date = moment(Date.now()).format()
            date = date.toString() //making date string

            let new_block = {}

            new_block[len + 1] = {
                "timestamp": date,
                "parante": _perant,
                "ref": _ref,
                "edge_in": [dir_vartix_in],
                "edge_out": [dir_vartix_out],
                "hash": this.calculateHash(publickey, body_data, date, dir_vartix_in, dir_vartix_out),
                "body": body_data,
                "signatue": "null"
            }
            Object.assign(data, new_block) //Join with old block
            this.update(data) //Update source file
            return data
        } catch (e) { console.log(e); }
    }

}

export default Hive;