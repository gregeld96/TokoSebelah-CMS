const bcrypt = require('bcryptjs')

function hashPassword (inputPass){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(inputPass, salt);
}

function comparePassword (inputPass, hashPassword){
    return bcrypt.compareSync(inputPass, hashPassword);
}

module.exports = { hashPassword, comparePassword }