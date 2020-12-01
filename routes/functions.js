"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var connection = require('../utils/db');
router.get('/', function (req, res) {
    res.send('Mysql Functions');
});
router.post("/plusMe", function async(req, res) {
    var num = req.body.num;
    var sql = "SELECT plus_me(" + num + ")";
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.send({ result: result });
    });
});
module.exports = router;
