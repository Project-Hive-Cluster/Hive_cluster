
import moment from 'moment';
import db from '../../Database/models/Centroid';
import { calculateHash } from './Mine'


class Centroid {

    constructor() {
    }
    create() {
        return new Promise(async (resolve, rejects) => {
            console.log("Genius Block Data Genarated");
            // Date
            let date = moment(Date.now()).format()
            date = date.toString()
            // Body
            let body = { "Titel": "Genesis", "Data": "Genesis Block", 'Auther': "Tanbin Hassan Bappi" }
            body = JSON.stringify(body)
            try {
                await db.create({ walletid: '0000000000000000', walletkey: 'genesis', timestamp: date, ref: 'this_root', hash: 'root', body, amount: 0, signatue: false })
                await this.push('0000000000000001', 'assects', { "Titel": "Assets", "Data": "Assets Block", 'Owner': "Genesis" }, 0, false)
                await this.push('0000000000000002', 'liabilities', { "Titel": "Liabilities", "Data": "Assets Block", 'Owner': "Genesis" }, 0, false)
                await this.push('0000000000000003', 'income', { "Titel": "Income", "Data": "Income Block", 'Owner': "Genesis" }, 0, false)
                await this.push('0000000000000004', 'expense', { "Titel": "Expense", "Data": "Expense Block", 'Owner': "Genesis" }, 0, false)
                resolve('Success')
            } catch (error) {
                console.error(error)
                // if (error.name === 'SequelizeUniqueConstraintError') {
                // rejects("Genesis Block Already ")
                // }
            }
        })
            .catch((err) => {
                rejects(err)
            })
    }
    zeroPad(num, places) { return String(num).padStart(places, '0') }
    async walletid(product = '0000') {
        const int_code = '0100'
        const bank_route = '9000'
        let code = await db.findOne({
            attributes: ['walletid'],
            order: [['id', 'DESC']]
        })
        code = code.walletid
        code = code.substr(-4)
        code = Number(code)
        code = code + 1
        code = this.zeroPad(code, 4)
        const walletid = int_code + bank_route + product + code
        return walletid
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

    async push(walletid, walletkey, body_data, amount = 0) {
        walletid = await this.walletid()
        try {
            let date = moment(Date.now()).format()
            date = JSON.stringify(date)

            // Previous Block
            let previous_block = await this.last_block()
            const previous_block_id = previous_block['id']
            const new_block_id = previous_block['id'] + 1
            previous_block = JSON.stringify(previous_block)

            // Hash Ref Block 
            let ref = await calculateHash(walletid, previous_block, date)


            // Hash Block 
            let hash = await calculateHash(walletid, body_data, date)


            //Stringify Data
            const body = JSON.stringify(body_data)
            // const walletid = JSON.stringify(walletid)
            const timestamp = date

            // Input To Database
            await db.create({ walletid, walletkey, timestamp, ref, hash, body, amount })
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
    //             let _hash = await calculateHash(previous_ref_block.uuid, previous_ref_block.body, previous_ref_block.timestamp).catch((err) => {
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
    //         const ref = await calculateHash(previous_block.uuid, previous_block.body, previous_block.timestamp).catch((err) => {
    //             rejects(err)
    //         })
    //         const hash = await calculateHash(walletid, body_data, date).catch((err) => {
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
