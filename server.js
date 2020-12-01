"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// Create a new express app instance
var app = express();
var connection = require('./utils/db');
var cloudinary = require('cloudinary').v2;
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 465,
    secure: false,
    auth: {
        user: "b8643a9da77e1b",
        pass: "76af23a258b5f6"
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});
transporter.verify(function (error, success) {
    if (error) {
        console.log("ERR***", error);
    }
    else {
        console.log("Server is ready to take our messages");
    }
});
var mailOptions = {
    from: 'noorulhuda682@gmail.com',
    to: 'noorulhuda682@gmail.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey Noor, it’s our first message sent with Nodemailer ;) ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
connection.connect(function (err) {
    if (err)
        throw new Error(err);
    console.log("mysql database is Connected!");
});
require('dotenv/config');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
var multer = require('multer');
var bodyParser = require("body-parser");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
app.post('/bulk', upload.array('profiles', 4), function (req, res) {
    try {
        res.send(req.files);
    }
    catch (error) {
        console.log(error);
        res.send(400);
    }
});
app.use("/getFormData", upload.single('image'), function (req, res) {
    console.log("res***}", req.headers.host, req.body);
    var _a = req.body, name = _a.name, email = _a.email;
    console.log("res3***}", req.file);
    cloudinary.uploader.upload(req.file.path)
        .then(function (result) {
        res.send({ message: "Success", result: { name: name, email: email, img: result.url } });
    }).catch(function (error) {
        res.status(500).send({
            message: "failure",
            error: error
        });
    });
});
app.use("/uploadVideo", upload.single('video'), function (req, res) {
    console.log("res***}", req.headers.host, req.body);
    var _a = req.body, name = _a.name, email = _a.email;
    // console.log("res3***}",req.file);
    var path = req.file.path;
    cloudinary.uploader.upload(path, { resource_type: "video", public_id: 'ajaz' })
        .then(function (result) {
        res.send({ message: "Success", result: { name: name, email: email, img: result.url } });
    }).catch(function (error) {
        res.status(500).send({
            message: "failure",
            error: error
        });
    });
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use('/tickets', require('./routes/tickets'));
app.use('/collaborations', require('./routes/collaborations'));
app.use('/functions', require('./routes/functions'));
app.use('/storedProcedure', require('./routes/storedProcedure'));
app.use('/emailWork', require('./routes/emailWork'));
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
