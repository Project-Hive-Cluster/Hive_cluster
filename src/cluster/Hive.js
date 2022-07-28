import { json } from 'express'
const fs = require('fs');
const path = require('path');
import { encrypt, decrypt } from '../app/security'
import moment from 'moment';


class Hive {

    constructor() {
    }

    async createSpine() {
        console.log("A request to create Spine of your Hive Cluster");
        let date = moment(Date.now()).format()
        date = date.toString()
        const genius_block = {
            0: {
                "uuid": "0",
                "date": date,
                "previous_node_id": "null",
                "previous_hash": "null",
                "body": [
                    { "Data": "Genius Block" }
                ],
                "signatue": "null"
            }
        }

        let data = JSON.stringify(genius_block)
        let encrypt_data = encrypt(data)

        console.log(encrypt_data);
        fs.writeFileSync("./src/cluster/spine.hv", encrypt_data.content, 'utf8')
        fs.writeFileSync("./src/cluster/spine.hash", encrypt_data.iv, 'utf8')
        return "Success"

    }

    async updateSpine(param) {
        let data = JSON.stringify(param)
        let encrypt_data = encrypt(data)
        console.log(encrypt_data);
        fs.writeFileSync("./src/cluster/spine.hv", encrypt_data.content, 'utf8')
        fs.writeFileSync("./src/cluster/spine.hash", encrypt_data.iv, 'utf8')
        return "Success"
    }



    async loadSpine() {
        const _iv = await fs.readFileSync("./src/cluster/spine.hash", 'utf8')
        const _content = await fs.readFileSync("./src/cluster/spine.hv", 'utf8')
        let hash = { "iv": _iv.toString(), "content": _content.toString() }
        let data = await decrypt(hash)
        data = JSON.parse(data)
        return data
    }

    async data(publickey, body_data) {


        //Load Spine
        let data = await this.loadSpine()
        //estemeting leath 
        let len = Object.keys(data)
        len = len.length - 1
        console.log(len);
        //previous block
        let previous_block = data[len]
        previous_block = JSON.stringify(previous_block)
        const encrypt_data = encrypt(previous_block)
        let block_no = len + 1
        // body_data = JSON.stringify(body_data)
        let date = moment(Date.now()).format()
        date = date.toString()

        let new_block = {}
        new_block[len + 1] = {
            "uuid": publickey,
            "date": date,
            "previous_hash": encrypt_data.content,
            "body": body_data,
            "signatue": encrypt_data.iv
        }
        Object.assign(data, new_block)
        await this.updateSpine(data)
        return data

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