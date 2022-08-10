
import moment from 'moment';
import { async } from 'regenerator-runtime';
import db from '../../Database/models/Centroid';

import { calculateHash } from '../security'


class Centroid {

    constructor() {
    }
    async create() {
        try {
            console.log("Genius Block Data Genarated");
            // Date
            let date = moment(Date.now()).format()
            date = date.toString()
            // Body
            let body = { "Titel": "Genesis", "Data": "Genesis Block", 'Auther': "Tanbin Hassan Bappi" }
            body = JSON.stringify(body)


            await db.create({ walletid: '0000000000000000', walletkey: 'genesis', timestamp: date, ref: 'this_root', hash: 'root', body, amount: 0, signatue: false })
            await this.push('0000000000000001', 'assects', { "Titel": "Assets", "Data": "Assets Block", 'Owner': "Genesis" })
            await this.push('0000000000000002', 'liabilities', { "Titel": "Liabilities", "Data": "Assets Block", 'Owner': "Genesis" })
            await this.push('0000000000000003', 'income', { "Titel": "Income", "Data": "Income Block", 'Owner': "Genesis" })
            await this.push('0000000000000004', 'expense', { "Titel": "Expense", "Data": "Expense Block", 'Owner': "Genesis" })

            return await db.findAll()
        }
        catch (err) {
            return err
        }
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
        try {

            walletid = await this.walletid()
            let date = moment(Date.now()).format()
            date = JSON.stringify(date)
            // Previous Block
            let previous_block = await this.last_block()
            let ref = previous_block.hash
            // Hash Block 
            let hash = await calculateHash(walletid, ref + body_data, date + amount)

            if (!hash) return "Hash Not Found"
            //Stringify Data
            const body = JSON.stringify(body_data)
            // const walletid = JSON.stringify(walletid)
            const timestamp = date
            // Input To Database
            console.log("World!");
            await db.create({ walletid, walletkey, timestamp, ref, hash, body, amount, signatue: false })
            return await db.findOne({
                attributes: ['walletid', 'timestamp'],
                order: [['id', 'DESC']]
            });


        } catch (e) {
            console.error(e);
            return e
        }

    }



    async last_block() {
        const data = await db.findOne({ order: [['id', 'DESC']] })
        return data
    }

}

export default Centroid;
