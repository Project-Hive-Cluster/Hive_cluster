import { encrypt, decrypt } from '../security'
import crypto from 'crypto'
import moment from 'moment';
import Hive from '../hive/Centroid';
import c_db from '../../Database/models/Centroid'
import v_db from '../../Database/models/Child_Node'
import { hash_gen } from '../Hive/Mine'



export default class Vertix {

    constructor() {

    }
    calculateHash(parante, data, timestamp, dir_vartix_in, dir_vartix_out) {
        if (!parante || !data || !timestamp) return "Missing data"
        return crypto.createHash('sha256').update(parante + dir_vartix_in + dir_vartix_out + data + timestamp).digest('hex');
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



    async insert(walletid, body_data, dir_vartix_in, dir_vartix_out, amount) {
        try {

            const cr_bal = this.balance(dir_vartix_out)
            if (cr_bal <= 0) {
                return
            }


            const dr_amount = Number(amount)
            let cr_amount = amount - (amount * 2)
            cr_amount = Number(cr_amount)
            /************
             * *  Date   *
             * 
             * **********/
            let date = moment(Date.now()).format()
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
            /***********************************************
              * 
              * 
              *             Directed Vartix IN/OUT
              * 
              * 
              * *********************************************/

            let vartix_in = {}
            let vartix_out = {}

            if (dir_vartix_in === walletid) {
                vartix_in = previous_Block
                vartix_out = await v_db.findOne({
                    where: {
                        walletid: walletid,
                    },
                    order: [['id', 'DESC']]
                })
            }

            if (dir_vartix_out === walletid) {
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
            let hashing_data = trno + dr_amount + body_data + date + dir_vartix_in + dir_vartix_out
            const in_hash = await hash_gen(hashing_data)

            hashing_data = trno + cr_amount + body_data + date + dir_vartix_out + dir_vartix_in
            const out_hash = await hash_gen(hashing_data)
            console.log(dir_vartix_in + trno + date + in_hash +
                dir_vartix_in +
                dir_vartix_out +
                out_hash +
                body_data);
            await v_db.create({

                walletid: dir_vartix_in,
                transaction_no: trno,
                transaction_count: 1,
                timestamp: date,
                ref: in_hash,
                edge_in: dir_vartix_in,
                edge_out: dir_vartix_out,
                hash: out_hash,
                amount: cr_amount,
                body: body_data
            })

            await v_db.create({
                walletid: dir_vartix_out,
                transaction_no: trno,
                transaction_count: 2,
                timestamp: date,
                ref: out_hash,
                edge_in: dir_vartix_in,
                edge_out: dir_vartix_out,
                hash: in_hash,
                amount: dr_amount,
                body: body_data
            })


            return trno

        } catch (e) {
            console.log("_insart");
            console.error(e);
        }
    }

}

