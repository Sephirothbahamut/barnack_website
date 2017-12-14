//==================== Initializations ====================

//dynamic pages
var express = require("express");
var app = express();
app.set("view engine", "ejs");

//http
var http = require("http");

//pages modules/db/db
var page = require(__dirname + "/pages/pages.js");
page.init(app);

//==================== Server ====================
//handle get
app.get("/", page.index.send_page);
app.get("/home", page.index.send_page);
app.get("/index", page.index.send_page);

app.get("/about_me", page.about_me.send_page);

app.use(function(req, res) {
    res.status(404);
	page._404.send_page(req, res);
});

//start server
app.listen(3000);
console.log("Sto funzionando...");