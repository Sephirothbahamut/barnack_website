var fs = require('fs');
var ejs = require("ejs");

exports.send_page = function send_page(req, res)
	{
	
	fs.readFile(__dirname + "/index.ejs", function(err, data) 
		{
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(ejs.render(data.toString(), {name: "pappo"}));
		res.end();
		
		});
	
	}