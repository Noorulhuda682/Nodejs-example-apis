"use strict";
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ahmad_12",
    database: "my-server"
    // here you can set connection limits and so on
});
module.exports = connection;
