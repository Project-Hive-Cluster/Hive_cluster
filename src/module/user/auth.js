import user_db from '../../Database/models/User';
import { passwordHash } from '../security';

const login = (user, pasword) => {
    return new Promise((resolve, reject) => {

        let userinfo = user_db.findOne({ where: { username: user } })
        if (userinfo === undefined) {
            const paylaod = "User Not Found"
            reject(paylaod)
        } else {

            const _password = crypto.createHash('sha256')
                .update(password, "utf8")
                .update(passwordHash(salt))
                .digest("base64");
            userinfo.pasword =
                resolve(userinfo)
        }

    })
}

// res.cookie(`walletid`, walletid, { expire: 200 + Date.now() })
// res.cookie(`public`, authokey, { expire: 200 + Date.now() })

module.exports = { login }