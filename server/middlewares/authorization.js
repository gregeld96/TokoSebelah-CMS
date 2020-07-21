const { User } = require('../models');

function Authorization(req, res, next){
    let { email } = req.userData

    User.findOne({
            where: {
                email
            }
        })
         .then(user => {
            if(user.role === 'admin'){
                next()
            } else throw ({status: 403, msg: "You are not Authorized!"})
        })
        .catch(err => {
            next(err)
        })
}

module.exports = Authorization;