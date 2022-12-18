const  crypto = require('crypto')

const calculateHash = (uuid, data, timestamp) => {
    return new Promise(async (resolve, rejects) => {
        data = JSON.stringify(data)
        if (!uuid) rejects("Missing data")
        if (!data) rejects("Missing data")
        if (!timestamp) rejects("Missing data")
        const hash = await crypto
            .createHash('sha256')
            .update(uuid + data + timestamp)
            .digest('hex')
        if (hash === undefined) rejects(null)
        resolve(hash)
    }).catch((err) => { return err })
}
const hash_gen = (data) => {
    return new Promise(async (resolve, rejects) => {
        data = JSON.stringify(data)
        if (!data) rejects("Missing data")
        const hash = await crypto
            .createHash('sha256')
            .update(data)
            .digest('hex')
        if (hash === undefined) rejects(null)
        resolve(JSON.stringify(hash))
    }).catch((err) => { return err })
}




module.exports = { calculateHash, hash_gen }