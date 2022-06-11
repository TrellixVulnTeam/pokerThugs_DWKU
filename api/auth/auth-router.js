const router = require('express').Router();
const User = require('../Users/user-model');
const { JWT_SECRET } = require('../secrets/index');
const { validateName } = require('./auth-middleware');
const bcrypt = require('bcryptjs');


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

router.post('/login', (req, res, next) => {
    res.send("Hello from auth router2")
})


module.exports = router;