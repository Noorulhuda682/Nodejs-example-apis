export {};
let express = require('express')
let router = express.Router();
let connection = require('../utils/db')

router.get('/', function(req:any,res:any){
    res.send('Hello Collabs');
})


router.post('/getFormData', (req:any,res:any)=>{
  
    console.log("FORMDATA***",req.body);
  
    
})

router.post('/getCollabTickets', function(req:any,res:any){
    let {collaborationId} = req.body;
    let sql = `SELECT * FROM collabs JOIN tickets on collabs.collaborationId=tickets.collaborationId`;
    connection.query(sql, function (err:string, result:any) {
     if (err) throw err;
     res.send({result:result});
    });
})

router.get('/crossJoin', (req:any,res:any)=> {
   let query = `SELECT * FROM collab CROSS JOIN ticket` 
   connection.query(query, (err:string,result:any)=> {
       if(err) res.status(400).send(err)
       res.send(result)
   })
})

router.get('/innerJoin', (req:any,res:any)=> {
   let query = `SELECT * FROM collab INNER JOIN ticket
                 ON collab.collaborationId = ticket.collaborationId` 
   connection.query(query, (err:string,result:any)=> {
       if(err) res.status(400).send(err)
       res.send(result)
   })
})

router.get('/outerJoin', (req:any,res:any)=> {
    let query = `SELECT * FROM collab  JOIN ticket` 
    connection.query(query, (err:string,result:any)=> {
        if(err) res.status(400).send(err)
        res.send(result)
    })
})

router.get('/leftJoin', (req:any,res:any)=> {
    let query = `SELECT * FROM ticket  LEFT JOIN collab
    ON ticket.collaborationId = collab.collaborationId` 
    connection.query(query, (err:string,result:any)=> {
        if(err) res.status(400).send(err)
        res.send(result)
    })
})

router.get('/rightJoin', (req:any,res:any)=> {
    let query = `SELECT * FROM collab  RIGHT JOIN  ticket
    ON ticket.collaborationId = collab.collaborationId` 
    connection.query(query, (err:string,result:any)=> {
        if(err) res.status(400).send(err)
        res.send(result)
    })
})

router.post("/addCollab", function async(req:any, res:any) {
    let {name,low,medium,high} = req.body;
    var sql = `INSERT INTO collaborations (name,low,medium,high)
     VALUES ("${name}",${low},${medium},${high})`;
    connection.query(sql, function (err:string, result:any) {
     if (err) throw err;
     res.send({msg:"1 record inserted"});
    });
});

 
module.exports = router;