const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');

var con = mysql.createConnection({
    host : 'localhost',
    user : 'GroceryUser',
    password : 'Secret1',
    database : 'nodelogin'
});
con.connect(function(err){
    if (err) throw err;
    console.log('connected to database');
});


app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/', function(req, res){
    console.log('A user has connected.');
    res.send('Welcome!');
});

app.get('/fan', function(req, res){
    const queryParams = req.query;
    console.log(queryParams);
    const truth = req.query.truth;
    res.send(truth + ', you are a fan!');
});

app.post('/attempt', function(req, res){
    console.log('A user has attempted to login.');
    
    const queryParams = req.query;
    console.log(queryParams);
    let username = req.query.username;
    let password = req.query.password;
    if(username && password){
        con.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
            if(results.length > 0){
                res.send('Success');
            }
            else{
                res.send('Either username or password was wrong');
            }
            res.end();
        });
    } else{
        res.send('Please enter username or password');
        res.end();
    }
});

app.listen(3000, function(){
    console.log('Listening on port 3000.');
});