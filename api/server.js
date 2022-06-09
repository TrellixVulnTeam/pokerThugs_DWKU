const express = require('express')
const userRouter = require('./Users/users-router')

const server = express();


server.use('/api/users', userRouter);

server.use('/pokerthugs', (req, res, next) => {
    res.status(200).send('TIME to PLAY PoKeR <3')
})


server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    });
});



module.exports = server;