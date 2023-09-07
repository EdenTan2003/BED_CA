/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

const db = require('./db');

const addressDB = {
    addAddress: ({ address_line1, address_line2, district, city_id, postal_code, phone }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES (?, ?, ?, ?, ?, ?)";
                dbConn.query(sql, [address_line1, address_line2, district, city_id, postal_code, phone], (err, result) => {
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

    updateAddress: ({ address_line1, address_line2, district, city_id, postal_code, phone, customer_id }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "UPDATE address SET address = ?, address2 = ?, district = ?, city_id = ?, postal_code = ?, phone = ? WHERE address_id = (SELECT address_id FROM customer WHERE customer_id = ?)";
                dbConn.query(sql, [address_line1, address_line2, district, city_id, postal_code, phone, customer_id], (err, result) => {
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

    deleteAddress: ({ address_id }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "DELETE FROM address WHERE address_id = ?";
                dbConn.query(sql, [address_id], (err, result) => {
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

    getAddress: ({ customer_id }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "SELECT * FROM address a, customer c WHERE c.address_id = a.address_id AND c.customer_id = ?";
                dbConn.query(sql, [customer_id], (err, result) => {
                    dbConn.end();
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(err, result[0]);
                    }
                });
            }
        });
    },
    getCities: (callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "SELECT city_id, city FROM city;";
                dbConn.query(sql, (err, result) => {
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
    getStoreAddress: (callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "SELECT s.store_id, a.address FROM store s INNER JOIN address a ON s.address_id = a.address_id;"
                dbConn.query(sql, (err, result) => {
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

module.exports = addressDB;