const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, Collection } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017/grocery-db';
let db = null;

app.use(express.static('public'));
app.use(bodyParser.json());

async function startDbAndServer() {
    await MongoClient.connect(MONGO_URL, function(err, datab){
        if(err) { throw err; }
        else{
            db = datab.db('grocery');
            console.log('Connected to Mongodb server');
            //populateFoodData();
            //viewData();
        }
    });
    app.listen(3000, function(){
        console.log('Listening on port 3000.');
    });
};
startDbAndServer();

app.get('/', function(req, res){
    console.log('A user has connected.');
    res.sendFile(__dirname + '/public/Portal-Login.html');
});

async function validItem(req, res){
    const queryParams = req.query;
    console.log(queryParams);
    const itemInput = req.query.searched.toString().toLowerCase().trim();
    let reg = new RegExp(`${itemInput}`);

    let collection = db.collection('groceryItems');
    const query ={
        "item":itemInput
    };
    const quer ={
        "item":reg
    };
    let manyResult = await collection.find(quer).toArray();
    console.log(manyResult);
    if(manyResult){
        res.send(JSON.stringify(manyResult));
    }
    else{
        res.send('No results');
    }
    res.end();
}
app.get('/searchItems', validItem);


async function validUser(req, res){
    const qp = req.body;
    console.log(qp);

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let collection = db.collection('groceryUsers');
    console.log("username input:"+ username + " password input:" + password + " email if present:" + email);

    if(username && password && email){
        let list = {
            'User': 1
        };
        const query ={
            "username": username,
            "password": password,
            "email": email,
            "list": list
        };
        let result = await collection.findOne(query); //this can be changed to speed up the process
        console.log("result:\n"+ result);
        if(result){
            console.log(result._id);
            console.log(result.username);
            console.log(result.password);
            console.log(result.email);
            res.send('User exists');
        }
        else{
            try{
                let insertVal = await collection.insertOne(query);
                console.log(insertVal);
                res.send(insertVal);
            }
            catch(err){
                console.log(err)
                res.send('Unexpected Result');
            }
        }
        res.end();
    }
    else if(username && password){
        console.log('A user has attempted to login.');
        const query ={
            "username": username,
            "password": password 
        };
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
        res.send('Please fill out all of the forms');
        res.end();
    }
}
app.post('/attempt', validUser);

async function addOn(req, res){
    let username = req.body.username;
    let item = req.body.item;
    let collection = db.collection('groceryUsers');

    if(username && item){
        const query ={
            "username": username,
        };
        let result = await collection.findOne(query);
        let objList = result.list;
        let foundItem = false;
        for(let [key, value] of Object.entries(objList)){
            console.log(`${key}: ${value}`);
            if(key === item.toString()){
                console.log("key === item.toString()");
                console.log(objList[key]);
                objList[key] += 1;
                console.log(objList[key]);
                foundItem = true;
            }
        }
        if(!foundItem){
            objList[item] = 1;
        }
        const updatedList = { $set: { list:objList } };
        let upResult = await collection.updateOne(query, updatedList);
        console.log(upResult);
        res.send('Success');
    }
    else{
        res.send("Failed Update");
    }
    res.end();
}
app.post('/addToUserList', addOn);

async function userLists(req, res){
    let user = req.query.username.toString()
    let collection = db.collection('groceryUsers');

    if(user){
        const query ={
            "username": user,
        };
        let result = await collection.findOne(query);
        if(result){
            console.log(result.list);
            let arr = Object.entries(result.list);
            res.send(arr);
        }
    }
    else{
        res.send("No List Available");
    }
    res.end();
}
app.get('/getUserList', userLists);


async function viewData(){
    let collection = db.collection('groceryItems');
    let result = await collection.find().toArray();
    console.log(result);
}

async function populateFoodData(){
    let collection = db.collection('groceryItems');
    const query0 ={
        "item":"apple",
        "inventory":10
    };
    const query1 ={
        "item":"grape",
        "inventory":10
    };
    const query2 ={
        "item":"oat",
        "inventory":10
    };
    const query3 ={
        "item":"milk",
        "inventory":10
    };
    const query4 ={
        "item":"pizza",
        "inventory":10
    };
    const query5 ={
        "item":"icecream",
        "inventory":10
    };
    const query6 ={
        "item":"water",
        "inventory":10
    };
    const query7 ={
        "item":"chicken",
        "inventory":10
    };
    const query8 ={
        "item":"cheese",
        "inventory":10
    };
    const query9 ={
        "item":"potato",
        "inventory":10
    };
    let result = await collection.insertMany([
        query0, query1, query2, query3, query4, 
        query5, query6, query7, query8, query9
    ]);
    console.log("result of insertMany into groceryItems = " + result);
}
