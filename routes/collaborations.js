"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var connection = require('../utils/db');
router.get('/', function (req, res) {
    res.send('Hello Collabs');
});
router.post('/getFormData', function (req, res) {
    console.log("FORMDATA***", req.body);
});
router.post('/getCollabTickets', function (req, res) {
    var collaborationId = req.body.collaborationId;
    var sql = "SELECT * FROM collabs JOIN tickets on collabs.collaborationId=tickets.collaborationId";
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.send({ result: result });
    });
});
router.get('/crossJoin', function (req, res) {
    var query = "SELECT * FROM collab CROSS JOIN ticket";
    connection.query(query, function (err, result) {
        if (err)
            res.status(400).send(err);
        res.send(result);
    });
});
router.get('/innerJoin', function (req, res) {
    var query = "SELECT * FROM collab INNER JOIN ticket\n                 ON collab.collaborationId = ticket.collaborationId";
    connection.query(query, function (err, result) {
        if (err)
            res.status(400).send(err);
        res.send(result);
    });
});
router.get('/outerJoin', function (req, res) {
    var query = "SELECT * FROM collab  JOIN ticket";
    connection.query(query, function (err, result) {
        if (err)
            res.status(400).send(err);
        res.send(result);
    });
});
router.get('/leftJoin', function (req, res) {
    var query = "SELECT * FROM ticket  LEFT JOIN collab\n    ON ticket.collaborationId = collab.collaborationId";
    connection.query(query, function (err, result) {
        if (err)
            res.status(400).send(err);
        res.send(result);
    });
});
router.get('/rightJoin', function (req, res) {
    var query = "SELECT * FROM collab  RIGHT JOIN  ticket\n    ON ticket.collaborationId = collab.collaborationId";
    connection.query(query, function (err, result) {
        if (err)
            res.status(400).send(err);
        res.send(result);
    });
});
router.post("/addCollab", function async(req, res) {
    var _a = req.body, name = _a.name, low = _a.low, medium = _a.medium, high = _a.high;
    var sql = "INSERT INTO collaborations (name,low,medium,high)\n     VALUES (\"" + name + "\"," + low + "," + medium + "," + high + ")";
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.send({ msg: "1 record inserted" });
    });
});
module.exports = router;
