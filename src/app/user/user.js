import { rejects } from 'assert';
import crypto from 'crypto'
import { resolve } from 'path';
class User {
    constructor() {

    }


    saveuser(user, key) {

    }

    add(param) {

        return new Promise((resolve, rejects) => {

            let password = Math.random().toString(36).slice(-8);
            password = password.replace(/o/g, 't')
            password = password.replace(/O/g, 'x')
            password = password.replace(/0/g, 'c')
            password = password.replace(/l/g, 'r')
            password = password.replace(/I/g, 't')
            password = password.replace(/1/g, 'a')
            console.log("password: " + password);

            crypto.generateKeyPair('rsa', {
                modulusLength: 530,    // options
                publicExponent: 0x10101,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'der'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'der',
                    cipher: 'aes-192-cbc',
                    passphrase: param
                }
            }, (err, publicKey, privateKey) => {
                // Callback function
                let user = []
                if (!err) {
                    publicKey = Buffer.from('publicKey')
                    publicKey = publicKey.toString('hex');

                    user = [{ "user": publicKey, "name": param }]

                    // Prints new asymmetric key pair
                    console.log("Public Key is : ", publicKey);
                    console.log("Private Key is: ", privateKey);
                    resolve(user)
                }
                else {
                    // Prints error
                    console.log("Errr is: ", err);
                    rejects("Errr is: ", err)
                }
            });

        })

    }

}

export default User