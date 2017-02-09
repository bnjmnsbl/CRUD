var express = require("express");
var bodyParser = require("body-parser")
var app = express();
var mongo=require('mongodb').MongoClient
var db;
var port = process.env.PORT 
 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongo.connect('mongodb://localhost:27017/benDB', (err, database) => { 
    if(err) return console.log(err);
    db = database;
    app.listen(port, function() {
    console.log("Listening on port " + port);
})
})

app.get("/", (req, res) => {
    db.collection("quotes").find().toArray(function(err, results) {
        if (err) return console.log(err)
        res.render("index.ejs", {quotes: results})
        console.log(results)
    })
})

app.post("/quotes", (req, res) => {
    db.collection("quotes").save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log("Saved to DB");
        res.redirect("/");
    })
})


