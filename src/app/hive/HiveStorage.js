const fs = require('fs');
import { rejects } from 'assert';
import { async } from 'regenerator-runtime';
import { encrypt, decrypt } from '../security'



export default class HiveStorage {


    constructor() {

    }


    getData() {
        return new Promise((resolve, rejects) => {
            fs.readFileSync((process.env.APPDATA) + '\\Hive Cluster\\data\\' + 'spine.' + 'clu', 'utf8')
                .then((data, err) => {
                    if (err) { rejects("Error Genarated in getdata. " + err) }
                    let buff = new Buffer.from(data, 'base64');
                    data = buff.toString('ascii')
                    data = JSON.parse(data)
                    data = decrypt(data)
                }).then(() => {
                    fs.readFileSync((process.env.APPDATA) + '\\Hive Cluster\\data\\' + 'spine.' + 'clu', 'utf8')
                        .then((data, err) => {
                            if (err) { rejects("Error Genarated in getdata. " + err) }
                            let buff = new Buffer.from(data, 'base64');
                            data = buff.toString('ascii')
                            data = JSON.parse(data)
                            data = decrypt(data)
                            return payload
                        }).finally(() => {
                            resolve("Success")
                        }).catch((err) => {
                            rejects("Error Genarated in getdata. " + err)
                        })
                })
        })

    }


    saveData(payload, location = 'data', file, callback) {
        return new Promise(async (resolve, rejects) => {
            payload = JSON.stringify(payload)
            let encrypt_data = encrypt(payload)
            encrypt_data = JSON.stringify(encrypt_data)
            let buff = new Buffer.from(encrypt_data);
            encrypt_data = buff.toString('base64');
            await fs.writeFile((process.env.APPDATA) + `\\Hive Cluster\\${location}\\` + file + '.clu', encrypt_data, 'utf8', async (err) => {
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

            if (fs.existsSync((process.env.APPDATA) + '\\Hive Cluster') === false) {

                fs.mkdirSync((process.env.APPDATA) + '\\Hive Cluster').then((err) => {
                    if (err) {
                        rejects("Error Creating hive folder: " + err)
                    }
                }).then(() => {
                    if (fs.existsSync((process.env.APPDATA) + '\\Hive Cluster\\data') === false) {
                        fs.mkdirSync((process.env.APPDATA) + '\\Hive Cluster\\data').then((err) => {
                            if (err) {
                                rejects("Error Creating data folder: " + err)
                            }
                        })
                    }
                }).then(() => {
                    if (fs.existsSync((process.env.APPDATA) + '\\Hive Cluster\\auth') === false) {
                        fs.mkdirSync((process.env.APPDATA) + '\\Hive Cluster\\auth').then((err) => {
                            if (err) {
                                rejects("Error Creating auth folder: " + err)
                            }
                        })
                    }
                }).finally(() => {
                    if (fs.existsSync((process.env.APPDATA) + '\\Hive Cluster') === true &&
                        fs.existsSync((process.env.APPDATA) + '\\Hive Cluster\\data') === true
                    ) {
                        resolve(callback())
                    } else {
                        this.createFolder()
                    }
                }).catch((err) => {
                    rejects("Error Creating data folder: " + err)
                })
            }
        })
    }

    init(payload) {
        return new Promise((resolve, rejects) => {

            this.createFolder(this.saveData(payload, (err) => {
                if (err) { rejects("Failed Error: " + err) }
                resolve("success")
            })).catch((err) => {
                rejects("Failed Error: " + err)
            })

            this.saveData(payload, 'data', 'spine', () => {
                resolve(this.getData())
            }).catch((err) => {
                rejects("Failed Error: " + err)
            })

        }).catch((err) => { return ("Failed to init Hive Storage. error: " + err) })
    }
}