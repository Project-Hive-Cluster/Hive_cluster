import crypto from 'crypto'
import db from '../../Database/models/Centroid';
import user_db from '../../Database/models/User';
import Centroid from '../hive/Centroid';
import { passwordHash } from '../security';
const centroid = new Centroid
class User {
    constructor() {

    }

    add(username, firstName, lastName, contact) {

        return new Promise((resolve, rejects) => {
            const salt = crypto.randomBytes(7).toString("hex");
            let _password = Math.random().toString(36).slice(-8);
            _password = _password.replace(/o/g, 't')
            _password = _password.replace(/O/g, 'x')
            _password = _password.replace(/0/g, 'c')
            _password = _password.replace(/l/g, 'r')
            _password = _password.replace(/I/g, 't')
            _password = _password.replace(/1/g, 'a')
            const text_password = _password.replace(/1/g, 'a')
            const password = crypto.createHash('sha256')
                .update(_password, "utf8")
                .update(passwordHash(salt))
                .digest("base64");

            crypto.generateKeyPair('rsa', {
                modulusLength: 4096,    // options
                publicExponent: 0x10101,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'der'
                }, privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'der',
                    cipher: 'aes-192-cbc',
                    passphrase: username
                }
            },
                async (err, publicKey, privateKey) => {
                    // Callback function
                    let user = []
                    if (!err) {

                        // Hexing Password
                        publicKey = Buffer.from('publicKey')
                        publicKey = publicKey.toString('hex');
                        privateKey = Buffer.from('privateKey')
                        const key = privateKey.toString('hex');
                        // Adding Salt
                        const walletid = salt + '.' + publicKey

                        // Genarating Block
                        const block_data = await centroid.push(walletid, `{"Login_ID":${username}}`, "0")
                        // Exreacting Data
                        const wallet = block_data.walletid
                        const reg_date = block_data.timestamp

                        const email = username
                        const status = 1
                        // Additional Data

                        // Adding To DB
                        await user_db.create({ username, reg_date, wallet, key, firstName, lastName, email, contact, password, status })
                        // Prints new asymmetric key pair
                        console.log("Public Key is : ", walletid);
                        console.log("Private Key is: ", key);


                        const fin_data = `{'username' : '${username}','password':'${text_password}','walletid':'${publicKey}'}`
                        resolve(fin_data)
                    }
                    else {
                        // Prints error
                        console.log("Errr is: ", err);
                        rejects("Errr is: ", err)
                    }
                })

        })

    }

}

export default User