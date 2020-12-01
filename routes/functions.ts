export {};
let express = require('express')
let router = express.Router();
let connection  = require('../utils/db')

router.get('/', function(req:any,res:any){
    res.send('Mysql Functions');
})



router.post("/plusMe", function async(req:any, res:any) {
    let num:number = req.body.num;
    let sql = `SELECT plus_me(${num})`;
    connection.query(sql, function (err:string, result:any) {
     if (err) throw err;
     res.send({result:result});
    });
});
 
module.exports = router;