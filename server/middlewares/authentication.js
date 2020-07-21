const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt')

async function Authentication(req, res, next){
    const { access_token } = req.headers

    try {
        const decoded = verifyToken(access_token)

        const user = await User.findOne({
            where: {
                email: decoded.email
            }
        })

        if(!user) throw ({status: 401, msg: `Authentification Failed`})
        else {
            req.userData = decoded;
            next()
        }
    } catch (err) {
        next(err)
    }
    
}

module.exports = Authentication;