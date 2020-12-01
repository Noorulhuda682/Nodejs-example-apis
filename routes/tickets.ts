export {};
let express = require('express')
let router = express.Router();
let connection  = require('../utils/db')

router.get('/', function(req:any,res:any){
    res.send('Tickets Place');
})



router.get("/getList", function async(req:any, res:any) {
    var sql = `SELECT * FROM tickets`;
    connection.query(sql, function (err:string, result:any) {
     if (err) throw err;
     res.send({result:result});
    });
});

router.post("/addTicket", function async(req:any, res:any) {
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