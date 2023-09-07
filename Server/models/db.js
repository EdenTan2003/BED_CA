/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

const mysql = require("mysql");

const dbconnect = {
    getConnection: function () {
        let conn = mysql.createConnection({
            host: "localhost",
            user: "bed_dvd_root",
            password: "pa$$woRD123",
            database: "bed_dvd_db",
            dateStrings: true
        });
        return conn;
    }
}

module.exports = dbconnect;