import express = require('express');
// Create a new express app instance
const app: express.Application = express();
let connection = require('./utils/db');
let cloudinary = require('cloudinary').v2;


const nodemailer = require("nodemailer");

let transporter =  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 465,
    secure: false, // use TLS
    auth: {
      user: "b8643a9da77e1b",
      pass: "76af23a258b5f6"
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  transporter.verify(function(error:any, success:any) {
    if (error) {
      console.log("ERR***",error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  let mailOptions = {
    from: 'noorulhuda682@gmail.com',
    to: 'noorulhuda682@gmail.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey Noor, it’s our first message sent with Nodemailer ;) ', 
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
  };

  transporter.sendMail(mailOptions, (error:any, info:any) => {
    if (error) {
        return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

connection.connect(function(err:any) {
    if (err) throw new Error(err);
    console.log("mysql database is Connected!");
});

require('dotenv/config');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

let multer = require('multer');
let bodyParser = require("body-parser");


app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());





var storage = multer.diskStorage({
    destination: function(req:express.Request, file:any, cb:any) {
        cb(null, './upload');
     },
    filename: function (req:any, file:any, cb:any) {
        cb(null , file.originalname);
    }
  });
  var upload = multer({ storage: storage })

  app.post('/bulk', upload.array('profiles', 4) , (req:any, res) =>{
    try {
        res.send(req.files);
    } catch(error) {
          console.log(error);
           res.send(400);
    }
  });

app.use("/getFormData",upload.single('image'),(req:any,res)=>{
    console.log("res***}",req.headers.host,req.body);
    let {name,email} = req.body; 
    console.log("res3***}",req.file);


    cloudinary.uploader.upload(req.file.path)
    .then((result:any)=>{
        res.send({message:"Success",result:{name,email,img:result.url}})
    }).catch((error:string) => {    
     res.status(500).send({
      message: "failure",
      error
     });
    });
})


app.use("/uploadVideo",upload.single('video'),(req:any,res:express.Response)=>{
    console.log("res***}",req.headers.host,req.body);
    let {name,email} = req.body; 
    // console.log("res3***}",req.file);
    let {path} = req.file;
    cloudinary.uploader.upload(
        path,
        {resource_type: "video",public_id:'ajaz'}
    )
    .then((result:any)=>{
        res.send({message:"Success",result:{name,email,img:result.url}})
    }).catch((error:any) => {
     res.status(500).send({
      message: "failure",
      error
     });
    });
})




app.get('/', function (req, res) {
res.send('Hello World!');
});

app.use('/tickets', require('./routes/tickets'))
app.use('/collaborations', require('./routes/collaborations'))
app.use('/functions', require('./routes/functions'))
app.use('/storedProcedure', require('./routes/storedProcedure'))
app.use('/emailWork', require('./routes/emailWork'))

app.listen(3000, function () {
console.log('App is listening on port 3000!');
});