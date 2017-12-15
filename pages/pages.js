var url = require('url');
var fs = require('fs');

exports.init = function init(app)
	{
	app.get("/", function(req, res)
		{
		var page_controller = require(__dirname + "/index/controller.js");
		page_controller.send_page(req, res);
		});
	
	app.all("/*", function(req, res)
		{
		var q = url.parse(req.url, true).pathname;
		if(q[q.length - 1] == "/")
			{//page request
			var page_controller = require(__dirname + q + "/controller.js");
			page_controller.send_page(req, res);
			}
		else
			{//other files
			var filename = "./pages/" + q;
			console.log(filename);
			fs.readFile(filename, function(err, data) 
				{
				if (err) 
					{
					res.writeHead(404, 	{'Content-Type': 'text/html'	});
					return res.end("404 Not Found");
					}  
				res.writeHead(200, 	{'Content-Type': 'text/css'	});
				res.write(data);
				res.end();
				});
			}
		});
	}