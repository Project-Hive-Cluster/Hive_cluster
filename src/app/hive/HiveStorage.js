const fs = require('fs');
import { rejects } from 'assert';
import { resolve } from 'path';
import { async } from 'regenerator-runtime';
import { encrypt, decrypt } from '../security'



export default class HiveStorage {


    constructor() {

    }


    getData() {
        return new Promise(async (resolve, rejects) => {
            try {
                let data = await fs.readFileSync((process.env.APPDATA) + '\\Hive Cluster\\data\\' + 'spine.' + 'clu', 'utf8')
                let buff = new Buffer.from(data, 'base64');
                data = buff.toString('ascii')
                data = JSON.parse(data)
                data = decrypt(data)
                resolve(data)
            } catch (err) { rejects("Rejeted by getdata. error: " + err) }
        })
    }


    saveData(payload, callback) {
        return new Promise(async (resolve, rejects) => {
            payload = JSON.stringify(payload)
            let encrypt_data = encrypt(payload)
            encrypt_data = JSON.stringify(encrypt_data)
            let buff = new Buffer.from(encrypt_data);
            encrypt_data = buff.toString('base64');
            await fs.writeFile((process.env.APPDATA) + '\\Hive Cluster\\data\\' + 'spine.' + 'clu', encrypt_data, 'utf8', async (err) => {
                if (err) {
                    rejects("Error Creating data folder: " + err)
                }
                resolve(callback())

            })
        }).catch((err) => {
            rejects("Failed to create data. Error: " + err)
        })
    }

    createFolder(callback) {

        return new Promise((resolve, rejects) => {
            fs.mkdir((process.env.APPDATA) + '\\Hive Cluster', (err) => {
                if (err) {
                    rejects("Error Creating Hive Cluster folder: " + err)
                } else {
                    fs.mkdir((process.env.APPDATA) + '\\Hive Cluster\\data', (err) => {
                        if (err) {
                            rejects("Error Creating data folder: " + err)
                        }
                        resolve(callback())
                    })
                }
            })
        })

    }

    init(payload) {
        return new Promise((resolve, rejects) => {
            if (fs.existsSync((process.env.APPDATA) + '\\Hive Cluster') === false) {
                this.createFolder(this.createdata(payload, (err) => {
                    resolve("success")
                })).catch((err) => {
                    rejects("Failed Error: " + err)
                })
            }
            this.saveData(payload, () => {
                resolve(this.getData())
            }).catch((err) => {
                rejects("Failed Error: " + err)
            })

        }).catch((err) => { return ("Rejeted by init. error: " + err) })
    }
}