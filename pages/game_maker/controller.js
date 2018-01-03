var fs = require('fs');
var ejs = require("ejs");

exports.send_page = function send_page(req, res)
	{
	
	fs.readFile(__dirname + "/../global/header.ejs", function(err, header) 
		{
		fs.readFile(__dirname + "/../global/navbar.ejs", function(err, navbar) 
			{
			fs.readFile(__dirname + "/page.ejs", function(err, page) 
				{
				var args = 
					{
					color_scheme: "dark"
					};
				
				var parts =
					{
					navbar: ejs.render(navbar.toString(), args),
					header: ejs.render(header.toString(), args)
					};
				
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(ejs.render(page.toString(), {parts: parts, args: args));
				res.end();
				
				});
			});
		});
	
	}