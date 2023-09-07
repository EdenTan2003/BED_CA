/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

const express = require("express");
const path = require("path");
const app = require("./controller/app.js");
const port = 3000;
const hostname = "localhost";

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "/public")));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
