/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyFunc = {
    verifyToken: (req, res, next) => { 
        var authHeader = req.headers['authorization']; //Retrieve authorization header's content

        if (!authHeader || !authHeader.includes('Bearer')) { //process the token
            return res.status(403).send({ auth: false, message: 'Not authorized, AuthHeader Error!' });
        }
        else {
            authHeader = authHeader.replace('Bearer ', ""); //obtain the token's value
            jwt.verify(authHeader, config.key, (err, payload) => { //verify token
                if (err) {
                    return res.status(403).send({ auth: false, message: 'Not authorized!' });
                }
                else {
                    req.body.payload = payload; //add payload to request body
                    next();
                }
            });
        }
    },
    verifyAdmin: (req, res, next) => {
        const role = req.body.payload.role;
        if (role === 'Admin') {
            next();
        }
        else {
            return res.status(403).send({ auth: false, message: 'Not Admin!' });
        }
    }
}

module.exports = verifyFunc;