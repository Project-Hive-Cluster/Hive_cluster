import crypto from 'crypto'
import moment from 'moment';
import c_db from '../../Database/models/Centroid'
import v_db from '../../Database/models/Vertix'
import { calculateHash } from '../security'



export default class Vertix {

    constructor() {

    }
    calculateHash(parante, data, timestamp, transfer_to, walletid) {
        if (!parante || !data || !timestamp) return "Missing data"
        return crypto.createHash('sha256').update(parante + transfer_to + walletid + data + timestamp).digest('hex');
    }

    async balance(walletid) {
        try {
            let balance = 0
            let payload = await v_db.findAll({
                attributes: ['amount'],
                where: { walletid: walletid }
            })
            payload.map(({ amount }) => {
                balance = balance + amount
            })

            return balance
        } catch (err) {
            console.error(err);
            return err
        }

    }



    async insert(walletid, body_data, transfer_to, amount) {
        try {
            /************
             * *  Date   *
             * 
             * **********/
            let date = moment(Date.now()).format()

            const genisis = "000000000000000"
            let genisis_flag = true
            const cr_bal = await this.balance(walletid)
            if (walletid != genisis + "0") {
                genisis_flag = false
                if (cr_bal <= 0 || cr_bal < amount) {
                    return "Insufficient Balance"
                }
            }
            const cr_amount = Number(amount)
            let dr_amount = amount - (amount * 2)
            dr_amount = Number(dr_amount)

            /***********************************************
            * 
            * 
            *             Previous Block
            * 
            * 
            * *********************************************/
            let init_block = await c_db.findOne({
                where: {
                    walletid: walletid,
                }
            })
            //Init object
            let previous_Block = {}

            // Condotion 
            if (init_block.signatue === false) {
                previous_Block = await c_db.findOne({
                    where: {
                        walletid: walletid,
                    }
                })
                await c_db.update({ signatue: true }, {
                    where: {
                        walletid: walletid,
                    }
                });

            } else {
                previous_Block = await v_db.findOne({
                    where: {
                        walletid: walletid,
                    }
                })
            }

            console.log(previous_Block);
            console.log(previous_Block.hash);
            /***********************************************
              * 
              * 
              *             Directed Vartix IN/OUT
              * 
              * 
              * *********************************************/

            let vartix_in = {}
            let vartix_out = {}

            if (transfer_to === walletid) {
                vartix_in = previous_Block
                vartix_out = await v_db.findOne({
                    where: {
                        walletid: walletid,
                    },
                    order: [['id', 'DESC']]
                })
            }

            if (walletid === walletid) {
                vartix_out = previous_Block
                vartix_in = await v_db.findOne({
                    where: {
                        walletid: walletid,
                    },
                    order: [['id', 'DESC']]
                })
            }

            // Making Tr
            let trno = Date.now() + crypto.randomInt(7)
            // trno = JSON.stringify(trno)
            /***********************************************
             * 
             * 
             *                  Hashing 
             * 
             * 
             * *********************************************/

            // CR
            let crRef_block = await c_db.findOne({
                where: {
                    walletid: transfer_to,
                },
                order: [['id', 'DESC']]
            })

            if (await this.verifyBlock(crRef_block) && await this.verifyBlock(previous_Block)) {
                // Credit Part
                const cr_hashing_data =
                    transfer_to
                    + body_data
                    + crRef_block.hash
                    + date
                    + cr_amount
                const cr_hash = await calculateHash(cr_hashing_data)
                await v_db.create({
                    walletid: transfer_to,
                    transaction_no: trno,
                    transaction_count: 1,
                    timestamp: date,
                    ref: crRef_block.hash,
                    edge_in: transfer_to,
                    edge_out: walletid,
                    hash: cr_hash,
                    amount: cr_amount,
                    body: body_data
                })

                // Debit Part

                const dr_hashing_data =
                    walletid
                    + body_data
                    + crRef.hash
                    + date
                    + dr_amount
                const dr_hash = await calculateHash(dr_hashing_data)
                await v_db.create({
                    walletid: walletid,
                    transaction_no: trno,
                    transaction_count: 2,
                    timestamp: date,
                    ref: previous_Block.hash,
                    edge_in: walletid,
                    edge_out: transfer_to,
                    hash: dr_hash,
                    amount: dr_amount,
                    body: body_data
                })
            }

            if (genisis_flag === true) {
                const cur_bal = await this.balance(transfer_to)
                return `Fund loaded Successful. Trno: ${trno} Balance: ${cur_bal}`
            }
            else {
                const cur_bal = await this.balance(walletid)
                return `Transfer from ${walletid} to ${transfer_to} Successful. Trno: ${trno} Remaining Balance: ${cur_bal}`
            }

        } catch (e) {
            console.log("_insart");
            console.error(e);
        }
    }


    async verifyBlock(previous_Block,) {

        // previous_Block = JSON.parse(previous_Block)

        console.log(previous_Block);

        let hash = previous_Block.hash
        let _hash =
            + previous_Block.walletid
            + previous_Block.ref
            + previous_Block.body
            + previous_Block.timestamp
            + previous_Block.amount
        _hash = await calculateHash(_hash)
        console.log(hash + "<+>" + _hash);

        return true

    }

}

