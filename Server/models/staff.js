/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

const db = require("./db");
const jwt = require('jsonwebtoken');
const config = require('../config');

const staffDB = {
    addStaff: ({first_name, last_name, address_id, picture, email, store_id, username, password}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "INSERT INTO staff (first_name, last_name, address_id, picture, email, store_id, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                dbConn.query(sql, [first_name, last_name, address_id, picture, email, store_id, username, password], (err, result) => {
                    dbConn.end();
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(err, result);
                    }
                });
            }
        });
    },
    staffLogin: ({username, password}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "SELECT * FROM staff WHERE username = ? AND password = ?";
                dbConn.query(sql, [username, password], (err, result) => {
                    dbConn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result)
                    }
                });
            }
        });
    }
}

module.exports = staffDB;