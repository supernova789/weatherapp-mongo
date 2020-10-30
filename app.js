const http = require('http');
var express = require('express');
const path = require('path');


const mongoose = require("mongoose");


//Local DB Setup
// const db = mongoose.connection;

// mongoose.connect('mongodb://localhost:27017/ng8crud', { useNewUrlParser: true }).then(
//     () => {
//         console.log('Database is connected'); 
//     },
//     err => { console.log('Can not connect to the database'+ err)}
//   );


//   db.once("open", function() {

//     db.collection('weather').count(function (err, count) {
//         if (err) throw err;    
//         console.log('Total Rows: ' + count);
//     });

//   }); 
  



const {
  MONGO_URL,
  MONGO_DATABASE,
  MONGO_USERNAME,
  MONGO_PASSWORD
}  = process.env;


// //Mongoose package for DB connection
mongoose.connect('mongodb://'+MONGO_URL+'/'+MONGO_DATABASE+'?authSource=admin', 
{ 
  useNewUrlParser: true,
  auth: {
    user: MONGO_USERNAME,
    password: MONGO_PASSWORD
   } 
}
).then(() => {
    console.log("DB connected");
}).catch((err)=> {
    console.log("ERROR")
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we're connected to Mongo!");

// db.collection('inventory').count(function (err, count) {
//     if (err) throw err;    
//     console.log('Total Rows: ' + count);
// });

//to log the row items
db.collection('weather', function (err, collection) {
        
  collection.find().toArray(function(err, items) {
     if(err) throw err;    
     console.log('The items are '+items);            
 });
 
});


});




var app = express();

// app.get('/product', (req, res) => {
//     const cursor = db.collection('Product').find();
//     // const item = JSON.parse(cursor);
//     // console.log("Products are "+cursor);
//     console.log("Data is "+cursor);
// }) 


app.get('/api/weather', (req, res) => {
    db.collection('weather').find().toArray()
      .then(result => {
        console.log(result);
        res.send(result);
      })
      .catch(error => console.error(error))
  })


// app.set('views', path.join(__dirname, 'views'));

app.set('/views', path.join(__dirname, '/views'));
app.use('/css',express.static(__dirname +'/css'));
app.use('/images',express.static(__dirname +'/images'));
app.use('/js',express.static(__dirname +'/js'));
app.use('/lib',express.static(__dirname +'/lib'));
app.use('/fonts',express.static(__dirname +'/fonts'));

app.use(express.json());

// default URL for website
// app.use('/', function(req,res){
//     res.sendFile(path.join(__dirname+'/views/index.html'));
//     //__dirname : It will resolve to your project folder.
//   });

//   app.use('/band', function(req,res){
//     res.sendFile(path.join(__dirname+'/views/band.html'));
//     //__dirname : It will resolve to your project folder.
//   });  
  

// Routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/weatherforecast_pune.html'));
});

// app.get('/band', function (req, res) {
//   res.sendFile(path.join(__dirname+'/views/band.html'));
// });

app.get('/pune', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/weatherforecast_pune.html'));
});

app.get('/mumbai', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/weatherforecast_mumbai.html'));
});

app.get('/bengaluru', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/weatherforecast_bengaluru.html'));
});

app.get('/delhi', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/weatherforecast_delhi.html'));
});

app.get('/hyderabad', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/weatherforecast_hyd.html'));
});

app.get('/chennai', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/weatherforecast_chennai.html'));
});


//Route fo JSP pages
app.get('/bengaluru-jsp', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/jsp/weatherforecast_bengaluru.jsp'));
});



app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});