const express = require("express");
const bodyParser = require("body-parser");
const algolia = require("algoliasearch");
const fetch = require('node-fetch');
const htmlToText = require('html-to-text');

const app = express();
const PORT = 8081;

const IP = process.env.ip;
const CONTENT_KEY = process.env.cKey;

const client = algolia('4JUOSRM4V0', process.env.algoliaKey);
const index = client.initIndex('article');

const filter = ["--------------------------------------------------------------------------------","\n", "--------------------------------------------------"];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res) {
    res.send("It's work");
});

app.post("/newPost", function(req, res) {
    const data = req.body.post.current;
    let article = {
        objectID : data.id,
        text : data.plaintext,
        url : data.url,
        title : data.title
    };
    filter.forEach((element) => article.text = text.replace(element, " "));
    if(data.custom_excerpt) article.description = data.custom_excerpt;
    index.addObject(article);
    res.send("It's work");
});

app.post("/delPost", function(req, res) {
    index.getObject(data.id, function(resp) {
        if(resp) index.deleteObject(data.id);
        else res.send("Not exist !");
    });
    res.send("It's work");
});

app.post("/updatePost", function(req, res) {
    const data = req.body.post.current;
    let article = {
        objectID : data.id,
        text : data.plaintext,
        url : data.url,
        title : data.title
    };
    filter.forEach((element) => article.text = text.replace(element, " "));
    if(data.custom_excerpt) article.description = data.custom_excerpt;
    index.getObject(data.id, function(resp) {
        if(resp) index.saveObject(article);
        else res.send("Not exist !");
    });
    res.send("It's work");
});

app.get("/info", function(req, res) {
    res.send("It's work");
});
app.get("/sync", function(req, res) {
    fetch("http://" + IP + "/ghost/api/v2/content/posts/?key=" + CONTENT_KEY)
        .then(res => res.json())
        .then(json => {
           const posts = json.posts;
           for(let key in posts){
               if(posts.hasOwnProperty(key)){
                   const data = posts[key];
                   let article = {
                       objectID : data.id,
                       url :  data.url,
                       title : data.title
                   };
                   let text = htmlToText.fromString(data.html, {
                       wordwrap: 130
                   });
                   filter.forEach((element) => text = text.replace(element, " "));
                   article.text = text;
                   if(data.custom_excerpt) article.description = data.custom_excerpt;
                   index.getObject(data.id, function(resp) {
                       if(resp) index.saveObject(article);
                       else index.addObject(article);
                   });
               }
           }
           res.send("Ok !");
        });
});

app.listen(PORT, function() {
    console.log("✔ Server for algolia start on 8081");
});

