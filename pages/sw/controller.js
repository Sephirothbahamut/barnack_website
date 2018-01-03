var fs = require('fs');
var ejs = require("ejs");

exports.send_page = function send_page(req, res)
	{
	
	fs.readFile(__dirname + "/../global/navbar.ejs", function(err, navbar) 
		{
		fs.readFile(__dirname + "/page.ejs", function(err, page) 
			{
			var args = 
				{
				navbar: ejs.render(navbar.toString(), {})
				};
			
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(ejs.render(page.toString(), args));
			res.end();
			
			});
		});
	
	}