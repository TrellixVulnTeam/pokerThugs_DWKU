const router = require('express').Router();
const User = require('../Users/user-model');
const { JWT_SECRET } = require('../secrets/index');
const { validateName, checkUsernameExists } = require('./auth-middleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', validateName, (req, res, next) => {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 10)
    User.add({ username, password: hash })
    .then(newUser => {
        res.status(201).json({
            id: newUser.id,
            username: newUser.username
        })
    })
    .catch(next)
})

router.post('/login', checkUsernameExists, (req, res, next) => {
   if(bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = buildToken(req.user)
    res.json({
        message: `Welcome back ${req.user.username}, the poker Thug! Lets play some Cards`,
        token,
    })
   } else {
       next({ status: 401, message: 'Invalid credentials'})
   }
})

function buildToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, JWT_SECRET, options)
}


module.exports = router;