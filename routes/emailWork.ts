export {};
let express = require('express')
let router = express.Router();
let connection  = require('../utils/db')

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



router.get('/', function(req:any,res:any){

    // transporter.sendMail(mailOptions, function (err:any, info:any) {
    //     if(err)
    //         console.log('***TESTERROR',err)
    //     else
    //         console.log('***TEST',info);
    // })
    res.send('This is Email Route');
})



router.get("/getList", function async(req:any, res:any) {
    var sql = `SELECT * FROM tickets`;
    connection.query(sql, function (err:string, result:any) {
     if (err) throw err;
     res.send({result:result});
    });
});

router.post("/sendEmail", function async(req:any, res:any) {
    let {ticketType,collaborationId,priority,workspaceId} = req.body;
    var sql = `INSERT INTO tickets (ticketType,collaborationId,priority,workspaceId)
     VALUES ("${ticketType}",${collaborationId},"${priority}","${workspaceId}")`;
    connection.query(sql, function (err:string, result:any) {
     if (err){
         res.status(400).send(err)
     }
     res.send({result:result});
    });
});
 
module.exports = router;