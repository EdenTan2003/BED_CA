/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

const db = require('./db');

const filmCategoriesDB = {
    getAllFilmCategories: ({category_id}, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const sql = "SELECT CAST(fc.film_id AS CHAR) AS film_id, f.title, c.name AS category, f.rating, CAST(f.release_year AS CHAR) AS release_year, CAST(f.length AS CHAR) AS duration, f.rental_rate FROM film f INNER JOIN film_category fc ON f.film_id = fc.film_id INNER JOIN category c on fc.category_id = c.category_id AND fc.category_id = ?;";
                dbConn.query(sql, [category_id], (err, result) => {
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

module.exports = filmCategoriesDB;
