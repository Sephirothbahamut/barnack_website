var url = require('url');
var fs = require('fs');
var ejs = require("ejs");

module.exports = function(req, res)
	{
	var q = url.parse(req.url, true).pathname;
	var arr = q.split("/").filter(function(str){return(str.length != 0);});
	arr = arr.slice(1);
	var str = arr.join("/");
	str = __dirname + "/" + str + "/controller.js";
	console.log("API request:  " + '"' + str + '"');
	
	try
		{
		var api = require(str);
		}
	catch(ex)
		{
		res.writeHead(404, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({error: "Trying to call non existing APIs"}));
		res.end();
		return;
		}
	
	api(req, res);
	}