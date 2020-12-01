export {};
let express = require('express')
let router = express.Router();
let connection  = require('../utils/db')

router.get('/', function(req:any,res:any){
    res.send('Mysql Stored Procedure');
})



router.get("/getCollaborations", function async(req:any, res:any) {
    let sql = `CALL collaborations()`;
    connection.query(sql, function (err:string, result:any) {
     if (err) throw err;
     res.send({result:result});
    });
});

router.post("/getACollaboration", function async(req:any, res:any) {
    let num:number = req.body.id;
    let sql = `CALL getACollaboration(${num});`;
    connection.query(sql, function (err:string, result:any) {
     if (err) throw err;
     res.send({result:result});
    });
});
 
module.exports = router;