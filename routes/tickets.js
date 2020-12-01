"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var connection = require('../utils/db');
router.get('/', function (req, res) {
    res.send('Tickets Place');
});
router.get("/getList", function async(req, res) {
    var sql = "SELECT * FROM tickets";
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.send({ result: result });
    });
});
router.post("/addTicket", function async(req, res) {
    var _a = req.body, ticketType = _a.ticketType, collaborationId = _a.collaborationId, priority = _a.priority, workspaceId = _a.workspaceId;
    var sql = "INSERT INTO tickets (ticketType,collaborationId,priority,workspaceId)\n     VALUES (\"" + ticketType + "\"," + collaborationId + ",\"" + priority + "\",\"" + workspaceId + "\")";
    connection.query(sql, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        res.send({ result: result });
    });
});
module.exports = router;
