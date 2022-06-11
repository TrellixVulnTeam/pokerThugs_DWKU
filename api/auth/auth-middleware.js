const { JWT_SECRET } = require("../secrets"); 
// const User = require('../users/users-model')
const jwt = require('jsonwebtoken')

const validateName = (req, res, next) => {
    if(!req.body.username || !req.body.username.trim()) {
        next({ status: 422, message: "username is required"})
    } else if (req.body.username.trim().length > 32) {
        next({ status:422, message: "username can not be longer than 32 char"})
    } else {
        req.username = req.body.username.trim()
        next()
    }
}




// if (!req.body.role_name || !req.body.role_name.trim()) {
//     req.role_name = 'student'
//     next()
//   } else if (req.body.role_name.trim() === 'admin') {
//     next({ status:422, message: "Role name can not be admin"})
//   } else if (req.body.role_name.trim().length > 32) {
//     next({ status:422, message:  "Role name can not be longer than 32 chars"})
//   } else {
//     req.role_name = req.body.role_name.trim()
//     next()

module.exports = {
    validateName,
}