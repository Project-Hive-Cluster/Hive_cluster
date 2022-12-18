const fs = require('fs');
const  { encrypt } = require("../security")

const createDataFolder = () => {
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
                resolve(replay)
            })
        })
    }).catch((err) => {
        console.error(err)
        rejects("Failed to create Folder" + err)
    })

}

const createDataFile = (_payload) => {
    return new Promise((resolve) => {
        _payload = encrypt(JSON.stringify(_payload))
        let encrypt_data = JSON.stringify(_payload)
        let buff = new Buffer.from(encrypt_data);
        encrypt_data = buff.toString('base64')
        console.log("Writing Genesis Data. " + encrypt_data)
        fs.writeFile((process.env.APPDATA) + `\\Hive Cluster\\data\\spine.clu`, encrypt_data, 'utf8', (err) => {
            if (err) {
                console.error("Create Data File run into Error: " + err)
                rejects(err)
            }
            console.log('Hive Cluster File created successfully!')
            resolve("Data Genarated Successfully")
        })
    })
}

const initialization = async (payload, callback) => {


    try {
        await createDataFile(payload)
        const reply = await createDataFolder(payload)
        callback(reply)
    } catch (err) {
        console.error(err)
        const error = new Error("Error while creating folder" + err)
        return error
    }

}

module.exports = initialization
