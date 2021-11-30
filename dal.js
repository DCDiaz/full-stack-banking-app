const MongoClient = require('mongodb').MongoClient;
// const url        = 'mongodb://localhost:27017';
//const url         = "mongodb+srv://DSquared:GdgPK8Ezkd7q867@fs-banking-app.iadlj.mongodb.net/fs-banking-app?retryWrites=true&w=majority";
const url         = process.env.MONGODB_URI;
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");
    // connect to fs-banking-app database
    db = client.db('fs-banking-app');
});
/*const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  db = client.db("fs-banking-app");
  console.log("Connected successfully to db server");
  //const collection = db.collection("devices");
  // perform actions on the collection object
  client.close();
});*/

// create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email) {
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            

    });    
}

// all users
function all() {
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

module.exports = {create, findOne, find, update, all};