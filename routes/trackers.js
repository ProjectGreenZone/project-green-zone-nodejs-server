const express = require('express');
const router = express.Router();
const User = require('../models/user');

function createRouter(socket){
    router.get('/', (req, res, next) =>{
        socket.to('u2').emit('message', { message: 'reading updaetes from room' });
        res.json('a');
        });
    
    return router;
}











module.exports = createRouter;