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

        if(user.role === 'admin') {
            req.userData = decoded;
            next()
        }
        else throw ({status: 401, msg: `Authentification Failed`})

    } catch (err) {
        next(err)
    }
    
}

module.exports = Authentication;