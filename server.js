const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, Collection } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017/grocery-db';
let db = null;

async function startDbAndServer() {
    await MongoClient.connect(MONGO_URL, function(err, datab){
        if(err) { throw err; }
        else{
            db = datab.db('grocery');
            console.log('Connected to Mongodb server');
        }
    });
    app.listen(3000, function(){
        console.log('Listening on port 3000.');
    });
};
startDbAndServer();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function(req, res){
    console.log('A user has connected.');
    res.sendFile(__dirname + '/public/Portal-Login.html');
});

app.get('/fan', function(req, res){
    const queryParams = req.query;
    console.log(queryParams);
    const truth = req.query.truth;
    if((truth.toString()).charAt(truth.toString().length-1) === 's'){
        res.send('No ' + truth + ', out of inventory!');
    }
    else{
        res.send('No ' + truth + '(s), out of inventory!');
    }
});


async function validUser(req, res){
    console.log('A user has attempted to login.');
    const qp = req.body;
    console.log(qp);
    //viewData();

    let username = req.body.username;
    let password = req.body.password;
    let collection = db.collection('groceryUsers');
    console.log("username input:"+ username + " password input:" + password)
    const query ={
        "username": username,
        "password": password 
    };

    if(username && password){
        let result = await collection.findOne(query);
        console.log("result:\n"+ result);
        if(result){
            console.log(result._id);
            console.log(result.username);
            console.log(result.password);
            res.send('Success');
        }
        else{
            res.send('Either username or password was wrong');
        }
        res.end();
    }
    else{
        res.send('Please enter username and password');
        res.end();
    }
}
app.post('/attempt', validUser);

async function viewData(){
    let collection = db.collection('groceryUsers');
    let result = await collection.find().toArray();
    console.log(result);
}