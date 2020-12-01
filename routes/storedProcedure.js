"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var connection = require('../utils/db');
router.get('/', function (req, res) {
    res.send('Mysql Stored Procedure');
});
router.get("/getCollaborations", function async(req, res) {
    var sql = "CALL collaborations()";
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.send({ result: result });
    });
});
router.post("/getACollaboration", function async(req, res) {
    var num = req.body.id;
    var sql = "CALL getACollaboration(" + num + ");";
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.send({ result: result });
    });
});
module.exports = router;
