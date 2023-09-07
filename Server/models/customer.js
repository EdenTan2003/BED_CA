/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

const db = require('./db');

const customerDB = {
    getCustomerPayment: ({customer_id, start_date, end_date}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = `SELECT f.title, CAST(p.amount AS CHAR) as amount, p.payment_date FROM film f, payment p, rental r, inventory i WHERE payment_date BETWEEN "${start_date}" AND "${end_date}" AND p.rental_id = r.rental_id AND r.inventory_id = i.inventory_id AND i.film_id = f.film_id AND p.customer_id=?;`;
                dbConn.query(sql, [customer_id], (err, result) => {
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
    addCustomer: ({store_id, first_name, last_name, email, address_id}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "INSERT INTO customer (store_id, first_name, last_name, email, address_id) VALUES (?, ?, ?, ?, ?)";
                dbConn.query(sql, [store_id, first_name, last_name, email, address_id], (err, result) => {
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
    getCustomerByEmail: ({email}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = `SELECT c.customer_id, c.address_id, c.email, concat(c.first_name, ' ',c.last_name) AS customer_fullname FROM customer c WHERE c.email LIKE LOWER('%${email}%');`;
                dbConn.query(sql, [email], (err, result) => {
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
    }
};

module.exports = customerDB;