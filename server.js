//Import the express and url modules
const { json } = require('body-parser');
let express = require('express');
let url = require("url");

const port = process.env.PORT || 3000
//The express module is a function. When it is executed it returns an app object
let app = express();
// app.post('mongodb+srv://aryan1234:aryan1234@cluster0.eyuvc.mongodb.net'
// , (req, res, next) => {
// req.collection.insert(req.body, (e, results) => {
// if (e) return next(e)
// res.send(results.ops)
// })
// })


// mongodb+srv://aryan1234:<password>@cluster0.eyuvc.mongodb.net


app.use(express.static("public"));

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://aryan1234:aryan1234@cluster0.eyuvc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });


//Set up the application to handle GET requests sent to the user path
app.get('/lessons', function (req, res) {
    console.log(product.product)
    res.send(product.product);

});//Subfolders
app.get('/user', function (req, res) {
    res.send(JSON.stringify({ email: "dd@gmail.com", password: "123456789" }));
});



// load Express.js

// parse the request parameters
app.use(express.json())
// connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect("mongodb+srv://aryan1234:aryan1234@cluster0.eyuvc.mongodb.net/"
    , (err, client) => {
        db = client.db('vueProject')
    })
// get the collection name
app.param('collectionName'
    , (req, res, next, collectionName) => {
        req.collection = db.collection(collectionName)
        // console.log('collection name:', req.collection)
        return next()
    });

// dispaly a message for root path to show that API is working
app.get('/'
    , function (req, res) {
        res.send('Select a collection, e.g., /collection/messages')
    })
// retrieve all the objects from an collection
app.get('/collection/:collectionName'
    , (req, res) => {
        console.log("yoyoy")
        req.collection.find({}).toArray((e, results) => {
            if (e) return next(e)
            res.send(results)
        })
    })

app.post('/collection/:collectionName'
    , (req, res, next) => {
        console.log(req);
       req.collection.insert(req.body, (e, results) => {
            if (e) return next(e)
            res.send(results.ops)
        })
    })

//Start the app listening on port 8080
app.listen(8080);

async function handleProductGet(request, response) {

}



// [
//     { 'topic': 'math', 'location': 'London', 'price': 100 },
//     { 'topic': 'math', 'location': 'Liverpool', 'price': 80 },
//     { 'topic': 'math', 'location': 'Oxford', 'price': 90 },
//     { 'topic': 'math', 'location': 'Bristol', 'price': 120 },
//    ]
