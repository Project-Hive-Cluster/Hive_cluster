const fs = require('fs');
import { rejectss } from 'assert';
import { encrypt, decrypt } from '../security'



export class GenesisFolder {

    constructor() {


    }

    createDataFolder(callback) {
        return new Promise((resolve, rejects) => {
            fs.mkdir((process.env.APPDATA) + '\\Hive Cluster\\data', { recursive: true }, (err) => {
                if (err) {
                    console.error(err)
                    rejects(err)
                }
                fs.mkdir((process.env.APPDATA) + '\\Hive Cluster\\auth', { recursive: true }, (err) => {
                    if (err) {
                        console.error(err)
                        rejects(err)
                    }
                    const replay = 'Hive Cluster Directory created successfully!'
                    resolve(callback(replay))
                })
            })
        }).catch((err) => {
            console.error(err)
            rejects("Failed to create Folder" + err)
        })

    }

    createDataFile(_payload, callback) {
        return new Promise((resolve) => {
            _payload = encrypt(JSON.stringify(_payload))
            encrypt_data = JSON.stringify(_payload)
            let buff = new Buffer.from(encrypt_data);
            encrypt_data = buff.toString('base64')
            console.log("Writing Genesis Data. " + encrypt_data)
            fs.writeFile((process.env.APPDATA) + `\\Hive Cluster\\data\\spine.clu`, encrypt_data, 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    rejects(err)
                }
                console.log('Hive Cluster File created successfully!')
                resolve(callback(data))
            })
        })
    }

    initialization(payload, callback) {
        return new Promise((resolve, rejects) => {
            this.createDataFolder((data) => {
                console.log("createDataFolder replay: " + data);
            }).then(() => {
                this.createDataFolder(payload, (err, _payload) => {
                    if (err) {
                        console.error(err)
                        rejects(err)
                    }
                    console.log("====>" + payload);
                    console.log("createDataFolder replay: " + _payload);
                    return _payload
                })
            }).finally((_payload) => {
                console.log("createDataFoldsdsder replay: " + _payload);
                resolve(callback(_payload))
            }).catch((err) => {
                console.log("Error initialization. " + err);
            })
        })

    }
}



export default class HiveStorage {

    constructor() {

    }

    getData(folder, file) {
        return new Promise((resolve, rejectss) => {
            const payload = fs.readFileSync((process.env.APPDATA) + `\\Hive Cluster\\${folder}\\` + file + '.clu', 'utf8')
                .then((data, err) => {
                    if (err) { rejectss("Error Genarated in getdata. " + err) }
                    let buff = new Buffer.from(data, 'base64');
                    data = buff.toString('ascii')
                    data = JSON.parse(data)
                    data = decrypt(data)
                    return payload
                }).finally(() => {
                    resolve(payload)
                }).catch((err) => {
                    rejectss("Error Genarated in getdata. " + err)
                })
        })

    }

    saveData(payload, location = 'data', file) {

        return new Promise(async (resolve, rejectss) => {
            payload = JSON.stringify(payload)
            let encrypt_data = encrypt(payload)
            encrypt_data = JSON.stringify(encrypt_data)
            let buff = new Buffer.from(encrypt_data);
            encrypt_data = buff.toString('base64')

            fs.writeFile((process.env.APPDATA) + `\\Hive Cluster\\${location}\\` + file + '.clu', encrypt_data, 'utf8', ((data, err) => {
                if (err) {
                    rejectss("Error Creating data folder: " + err)
                } else {
                    resolve(data)
                }
            })
            )
        }).catch((err) => {
            rejectss("Failed to create data. Error: " + err)
        })
    }


    init(payload) {
        return new Promise(async (resolve, rejectss) => {
            try {
                console.log("Progress 5% Checking existence of Hive Cluster. Status " + fs.existsSync((process.env.APPDATA) + '\\Hive Cluster'))
                CreateGenisisFolder.mkhive()

                console.log("Progress 50% Checking existence of Hive Cluster Data Folder. Status " + fs.existsSync((process.env.APPDATA) + '\\Hive Cluster\\data'));
                CreateGenisisFolder.mkhivedata(payload)

                console.log("Progress 75% Checking existence of Hive Cluster Auth. Status " + fs.existsSync((process.env.APPDATA) + '\\Hive Cluster\\auth'));
                CreateGenisisFolder.mkhiveauth()

                console.log("Progress 90% Checking")
                CreateGenisisFolder.check()


            } catch (err) { rejectss("Failed to create data.: " + err) }

            resolve(true)
        }).catch((err) => { return ("Failed to init Hive Storage. error: " + err) })
    }
}

// export { HiveStorage, GenesisFolder }