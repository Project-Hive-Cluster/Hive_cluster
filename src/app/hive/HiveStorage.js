const fs = require('fs');
import { rejects } from 'assert';
import { encrypt, decrypt } from '../security'



export class GenesisFolder {

    constructor(_payload) {

    }

    createDataFolder() {
        return new Promise((resolve, rejects) => {
            fs.mkdirSync((process.env.APPDATA) + '\\Hive Cluster\\data', { recursive: true });
            fs.mkdirSync((process.env.APPDATA) + '\\Hive Cluster\\auth', { recursive: true });
            resolve()
        }).catch((err) => {
            rejects("Failed to create Folder" + err)
        })

    }

    createDataFile(payload = this.payload) {
        return new Promise((resolve) => {
            payload = JSON.stringify(payload)
            let encrypt_data = encrypt(payload)
            encrypt_data = JSON.stringify(encrypt_data)
            let buff = new Buffer.from(encrypt_data);
            encrypt_data = buff.toString('base64')
            console.log("Writing Genesis Data. " + encrypt_data)
            fs.writeFileSync((process.env.APPDATA) + `\\Hive Cluster\\data\\spine.clu`, encrypt_data, 'utf8')
            resolve(data)
        })
    }

    initialization() {

        this.createDataFolder().then(() => {
            this.createDataFolder(this.payload)
        }).catch((err) => {
            console.log("Error initialization. " + err);
        })

        return this.payload


    }
}



export default class HiveStorage {

    constructor() {

    }

    getData(folder, file) {
        return new Promise((resolve, rejects) => {
            const payload = fs.readFileSync((process.env.APPDATA) + `\\Hive Cluster\\${folder}\\` + file + '.clu', 'utf8')
                .then((data, err) => {
                    if (err) { rejects("Error Genarated in getdata. " + err) }
                    let buff = new Buffer.from(data, 'base64');
                    data = buff.toString('ascii')
                    data = JSON.parse(data)
                    data = decrypt(data)
                    return payload
                }).finally(() => {
                    resolve(payload)
                }).catch((err) => {
                    rejects("Error Genarated in getdata. " + err)
                })
        })

    }

    saveData(payload, location = 'data', file) {

        return new Promise(async (resolve, rejects) => {
            payload = JSON.stringify(payload)
            let encrypt_data = encrypt(payload)
            encrypt_data = JSON.stringify(encrypt_data)
            let buff = new Buffer.from(encrypt_data);
            encrypt_data = buff.toString('base64')

            fs.writeFile((process.env.APPDATA) + `\\Hive Cluster\\${location}\\` + file + '.clu', encrypt_data, 'utf8', ((data, err) => {
                if (err) {
                    rejects("Error Creating data folder: " + err)
                } else {
                    resolve(data)
                }
            })
            )
        }).catch((err) => {
            rejects("Failed to create data. Error: " + err)
        })
    }


    init(payload) {
        return new Promise(async (resolve, rejects) => {
            try {
                console.log("Progress 5% Checking existence of Hive Cluster. Status " + fs.existsSync((process.env.APPDATA) + '\\Hive Cluster'))
                CreateGenisisFolder.mkhive()

                console.log("Progress 50% Checking existence of Hive Cluster Data Folder. Status " + fs.existsSync((process.env.APPDATA) + '\\Hive Cluster\\data'));
                CreateGenisisFolder.mkhivedata(payload)

                console.log("Progress 75% Checking existence of Hive Cluster Auth. Status " + fs.existsSync((process.env.APPDATA) + '\\Hive Cluster\\auth'));
                CreateGenisisFolder.mkhiveauth()

                console.log("Progress 90% Checking")
                CreateGenisisFolder.check()


            } catch (err) { rejects("Failed to create data.: " + err) }

            resolve(true)
        }).catch((err) => { return ("Failed to init Hive Storage. error: " + err) })
    }
}

// export { HiveStorage, GenesisFolder }