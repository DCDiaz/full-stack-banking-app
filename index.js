var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    /*res.send({
        name: req.params.name,
        email: req.params.email,
        password: req.params.password
    });*/

    // check if account exists
    dal.find(req.params.email).
        then((users) => {
            // if user exists, return error message
            if(users.length > 0) {
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else {
                // else create user
                dal.create(req.params.name, req.params.email, req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }
        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {
    /*res.send({
        name: 'peter',
        email: 'peter@mit.edu',
        password: 'secret'
    });*/
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Running on port ${port}`);
});