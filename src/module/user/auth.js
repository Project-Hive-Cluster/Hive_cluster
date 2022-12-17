import crypto from "crypto"
import user_db from "../../Database/models/User"
import { passwordHash } from "../security"

const login = async (user, password) => {
  console.log("userinfo />")
  let userinfo = await user_db.findOne({ where: { wallet: user } })
  console.log("userinfo />", userinfo)
  if (userinfo === undefined) {
    const paylaod = "User Not Found"
    return paylaod
  } else {
    const _password = crypto
      .createHash("sha256")
      .update(password, "utf8")
      .update(passwordHash(salt))
      .digest("base64")
    if (userinfo.pasword === _password) {
      const obj = {
        username: userinfo.firstName,
        role: "0",
        token: _password,
      }
      return obj
    } else {
      return "User Not Found"
    }
  }
}

// res.cookie(`walletid`, walletid, { expire: 200 + Date.now() })
// res.cookie(`public`, authokey, { expire: 200 + Date.now() })

module.exports = { login }
