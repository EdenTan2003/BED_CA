/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

const db = require('./db');

const filmDB = {
    getFilmByID: ({ id }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = `SELECT CAST(f.film_id AS CHAR) AS film_id, f.title, f.description, f.rating, CAST(f.release_year AS CHAR) AS release_year, CAST(f.length AS CHAR) AS duration, f.rental_rate, f.rental_duration, f.special_features, f.image, f.rating, c.name AS category, l.name FROM film f INNER JOIN film_category fc ON f.film_id = fc.film_id INNER JOIN category c ON fc.category_id = c.category_id INNER JOIN language l ON f.language_id = l.language_id WHERE f.film_id = ?;`;

                dbConn.query(sql, [id], (err, result) => {
                    dbConn.end();
                    if (err) {
                        return callback(err);
                    }
                    else {
                        if (result.length === 0) {
                            return callback("No movie found");
                        }

                        return callback(null, result[0]);
                    }
                });
            }
        });
    },

    getFilmByNameFilterPrice: ({ title, max_price }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = `SELECT CAST(f.film_id AS CHAR) AS film_id, f.title, f.description, f.rating, CAST(f.release_year AS CHAR) AS release_year, CAST(f.length AS CHAR) AS duration, f.rental_rate, f.rating, c.name AS category FROM film f INNER JOIN film_category fc ON f.film_id = fc.film_id INNER JOIN category c ON fc.category_id = c.category_id WHERE LOWER(f.title) LIKE LOWER('%${title}%') AND f.rental_rate <= ${max_price};`;
                dbConn.query(sql, [title, max_price], (err, result) => {
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
    getAllFilmCategoryName: (callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "SELECT category_id, name FROM category;";
                dbConn.query(sql, (err, result) => {
                    dbConn.end();
                    if (err) {
                        console.log("Error while getting categories")
                        console.log(err)
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    addNewFilm: ({ title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "INSERT INTO film (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                dbConn.query(sql, [title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features], (err, result) => {
                    dbConn.end();
                    if (err) {
                        console.log("Error while adding new film")
                        console.log(err)
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    addFilmImage: ({ film_id, image }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = `UPDATE film SET image = "${image}" WHERE film_id = "${film_id}";`;
                dbConn.query(sql, [film_id, image], (err, result) => {
                    dbConn.end();
                    if (err) {
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    getFilmLanguage: (callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "SELECT language_id, name FROM language;";
                dbConn.query(sql, (err, result) => {
                    dbConn.end();
                    if (err) {
                        console.log("Error while getting languages")
                        console.log(err)
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    
};

module.exports = filmDB;
