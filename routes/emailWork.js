"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var connection = require('../utils/db');
// const nodemailer = require("nodemailer");
// require('dotenv/config');
// var transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAILPASSWORD
//     }
// });
// const mailOptions = {
//     from: 'noorulhuda682@gmail.com', // sender address
//     to: 'noorulhuda682@gmail.com', // list of receivers
//     subject: 'test mail', // Subject line
//     text:"Good email work "
//     // html: '<h1>this is a test mail.</h1>'// plain text body
// };
router.get('/', function (req, res) {
    // transporter.sendMail(mailOptions, function (err:any, info:any) {
    //     if(err)
    //         console.log('***TESTERROR',err)
    //     else
    //         console.log('***TEST',info);
    // })
    res.send('This is Email Route');
});
router.get("/getList", function async(req, res) {
    var sql = "SELECT * FROM tickets";
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.send({ result: result });
    });
});
router.post("/sendEmail", function async(req, res) {
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
