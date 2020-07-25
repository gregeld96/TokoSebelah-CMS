const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class UserController {
    static login(req, res, next){
        const { email, password } = req.body

        if(!email || !password){
            next ({
                status: 400,
                msg: `Email and Password required`
            })
        } else {
            User.findOne({
                where: {
                    email
                }
            })
            .then(user => {
                if(!user || user.role !== 'admin') throw ({status: 400, msg: `Email or Password Invalid`})

                let result = comparePassword(password, user.password)
                if(result){
                    let access_token = createToken({id: user.id, email: user.email})
                    res.status(200).json({access_token, msg: `Successfully logged in!`} )
                } else throw ({status: 400, msg: `Email or Password Invalid`})
            })
            .catch(err => {
                next(err)
            })
        }
    }

    static register(req,res,next){
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
            .then(data => {
                res.status(201).json(`${newUser.name} successfully registered!`)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController;