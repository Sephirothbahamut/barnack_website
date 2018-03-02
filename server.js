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

app.use(function(req, res) {
    res.status(404);
	page._404.send_page(req, res);
});

//start server
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

//alive
setInterval(function()
	{
	http.get("https://barnack-website.herokuapp.com/");
	}, 300000)