const crypto = require("crypto")

const algorithm = "aes-256-ctr"
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3"

const encrypt = (text, user = secretKey) => {
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, user, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  }
}

const decrypt = (hash, user = secretKey) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    user,
    Buffer.from(hash.iv, "hex")
  )

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ])

  return decrpyted.toString()
}

const calculateHash = (data) => {
  return new Promise(async (resolve, rejects) => {
    data = JSON.stringify(data)
    if (!data) rejects("Missing data")
    const hash = await crypto.createHash("sha256").update(data).digest("hex")
    if (hash === undefined) rejects(null)
    resolve(JSON.stringify(hash))
  }).catch((err) => {
    return err
  })
}

function passwordHash(val) {
  return crypto.createHash("sha256").update(val, "utf8").digest()
}

module.exports = {
  encrypt,
  decrypt,
  calculateHash,
  passwordHash,
}
