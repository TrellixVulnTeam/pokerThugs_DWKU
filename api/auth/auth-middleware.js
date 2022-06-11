const { JWT_SECRET } = require("../secrets"); 
const User = require('../Users/user-model');
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

const checkUsernameExists =  async (req, res, next) => {
    try {
        const [user] = await User.findBy({ username: req.body.username })
        if(!user) {
            next({ status: 401, message: 'Invalid credentials'})
        } else {
            req.user = user
            next()
        }
    } catch(err) {
        next(err)
    }
}



module.exports = {
    validateName,
    checkUsernameExists,
}