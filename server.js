//==================== Initializations ====================
//dynamic pages
const express = require("express");
const session = require("express-session");
const app = express();
const fileUpload = require("express-fileupload");
 
var http = require("http");

// default options
app.set("view engine", "ejs");
app.use(fileUpload());
app.use(session({secret: "whut"}));
app.use(express.static(__dirname + "/files"));

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

//http & https
/*var https = require("https");*/
/*http.createServer(app).listen(80);
https.createServer(app).listen(443);*/

//alive
setInterval(function()
	{
	http.get("http://barnack-website.herokuapp.com/");
	}, 300000)