/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

const db = require("./db");

const actorDB = {
    getActorsFromFilm: ({film_id}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "SELECT a.actor_id, concat(a.first_name, ' ', a.last_name) AS actor_fullname FROM actor a INNER JOIN film_actor fa ON a.actor_id = fa.actor_id WHERE fa.film_id = ?;";
                dbConn.query(sql, [film_id], (err, result) => {
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

    getActor: ({actor_id}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "SELECT actor_id, first_name, last_name FROM actor WHERE actor_id = ?";
                dbConn.query(sql, [actor_id], (err, result) => {
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
    getAllActors: ({limit, offset}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "SELECT actor_id, first_name, last_name FROM actor LIMIT ? OFFSET ?;";
                dbConn.query(sql, [limit, offset], (err, result) => {
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
    addActor: ({first_name, last_name}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "INSERT INTO actor (first_name, last_name) VALUES (?, ?)";
                dbConn.query(sql, [first_name, last_name], (err, result) => {
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
    updateActor: ({actor_id, first_name, last_name}, callback) => {
        first_name = first_name || null;
        last_name = last_name || null;

        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                const sql = "UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?";
                dbConn.query(sql, [first_name, last_name, actor_id], (err, result) => {
                    dbConn.end();
                    if (err) {
                        console.log(err);
                        return callback(err);
                    }
                    else {
                        return callback(err, result);
                    }
                });
            }
        });
    },
    deleteActor: ({actor_id}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "DELETE FROM actor WHERE actor_id = ?";
                dbConn.query(sql, [actor_id], (err, result) => {
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
}

module.exports = actorDB;