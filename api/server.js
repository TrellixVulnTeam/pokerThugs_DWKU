const express = require('express');
const helmet = require('helmet');
const cors = require('cors')

const userRouter = require('./Users/users-router');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors())

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

server.use('/pokerthugs', (req, res, next) => {
    res.status(200).send('TIME to PLAY PoKeR <3');
});


server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    });
});



module.exports = server;