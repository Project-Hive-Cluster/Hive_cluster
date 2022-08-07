import crypto from 'crypto'
import moment from 'moment';
import db from '../../Database/models/Centroid';


class Centroid {

    constructor() {
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
        }).catch((err) => { return err })
    }

    create() {
        return new Promise(async (resolve, rejects) => {
            let date = moment(Date.now()).format()
            date = date.toString()
            const genesis_data = {
                0: {
                    "walletid": "genesis",
                    "timestamp": date,
                    "ref": "root",
                    "hash": "empty",
                    "body":
                        { "Data": "Genesis Block", 'Auther': "Tanbin Hassan Bappi" }
                    ,
                    "amount": "0"
                }
            }

            console.log("Genius Block Data Genarated");
            const { uuid, walletid, timestamp, ref, hash, body, amount } = genesis_data['0']
            console.log("Init Database Entry");
            let _body = JSON.stringify(body)
            try {
                const data = await db.create({ uuid, walletid, timestamp, ref, hash, body: _body, amount })
                // console.log(data);
                resolve(data)
            } catch (err) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    rejects("Genesis Block Already ")
                }
            }
        })
            .catch((err) => {
                rejects(err)
            })
    }


    async get() {
        try {
            const data = db.findAll()
            return data

        } catch (e) {
            return e
        }


    }

    /**************************************************
     * Push Function
     * 
     * 
     * 
     * ************************************************/

    async push(walletid, body_data, amount = 0) {
        console.log("walletid " + walletid);

        try {
            let date = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')
            date = JSON.stringify(date)


            // Previous Block
            let previous_block = await this.last_block()
            const previous_block_id = previous_block['id']
            const new_block_id = previous_block['id'] + 1
            previous_block = JSON.stringify(previous_block)

            // Hash Ref Block 
            let ref = await this.calculateHash(walletid, previous_block, date)


            // Hash Block 
            let hash = await this.calculateHash(walletid, body_data, date)


            //Stringify Data
            const body = JSON.stringify(body_data)
            // const walletid = JSON.stringify(walletid)
            const timestamp = date

            // Input To Database
            await db.create({ new_block_id, walletid, timestamp, ref, hash, body, amount })
            return await db.findOne({
                attributes: ['walletid', 'timestamp'],
                order: [['id', 'DESC']]
            });
        }
        catch (e) {
            console.error(e);
            return e
        }
    }



    // async _push(walletid, body_data, amount = 0) {
    //     const pro = new Promise(async (resolve, rejects) => {
    //         if (!walletid) rejects("Null value found.")
    //         body_data = JSON.stringify(body_data)
    //         /*
    //          Load Centroid
    //         */
    //         let data = await this.search()
    //         console.log(">>" + data);
    //         if (!data) {
    //             rejects("Unable to load Centroid")
    //         }
    //         /* Centroid Length */
    //         let len = Object.keys(data)
    //         len = len.length - 1
    //         /* 
    //              Working with previous block
    //          */
    //         let previous_block = data[len]

    //         // Security
    //         if (len != 0) {
    //             let temp_hash = previous_block.ref
    //             const _len_ref_block = len - 1
    //             let previous_ref_block = data[_len_ref_block]
    //             let _hash = await this.calculateHash(previous_ref_block.uuid, previous_ref_block.body, previous_ref_block.timestamp).catch((err) => {
    //                 rejects(err)
    //             })
    //             if (_hash != temp_hash) {
    //                 console.log({ "Error": "Hash Mismatch", "hash": _hash, "ref": temp_hash });
    //                 rejects({ "Error": "Hash Mismatch", "hash": _hash, "ref": temp_hash })
    //             }

    //             if (previous_block.uuid === walletid) {
    //                 console.log({ "Error": "Hash Mismatch", "hash": _hash, "ref": temp_hash });
    //                 rejects("User already present.")
    //             }
    //         }
    //         /*
    //           Creating New Block
    //         */
    //         let block_no = len + 1

    //         date = date.toString() //making date string
    //         const ref = await this.calculateHash(previous_block.uuid, previous_block.body, previous_block.timestamp).catch((err) => {
    //             rejects(err)
    //         })
    //         const hash = await this.calculateHash(walletid, body_data, date).catch((err) => {
    //             rejects(err)
    //         })
    //         const _body = JSON.stringify(body_data)
    //         await db.create(block_no, walletid, date, ref, hash, _body, amount, status)
    //         resolve(_body)

    //     }).catch((err) => { return err })
    //     console.log(await pro);
    //     return pro
    // }

    async last_block() {
        const data = await db.findOne({ order: [['id', 'DESC']] })
        return data
    }

}

export default Centroid;
