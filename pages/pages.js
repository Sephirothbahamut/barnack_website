var url = require('url');
var fs = require('fs');

exports._404 = require(__dirname + "/404/404.js");
exports.index = require(__dirname + "/index/index.js");

exports.init = function init(app)
	{
	app.all("/global/css/*", function(req, res)
		{
		var q = url.parse(req.url, true);
	  	var filename = "./pages/" + q.pathname;
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
		})
	app.all("/global/js/*", function(req, res)
		{
		var q = url.parse(req.url, true);
	  	var filename = "./pages/" + q.pathname;
		fs.readFile(filename, function(err, data) 
			{
			if (err) 
				{
				res.writeHead(404, 	{'Content-Type': 'text/html'	});
				return res.end("404 Not Found");
				}  
			res.writeHead(200, 	{'Content-Type': 'text/javascript'	});
			res.write(data);
			res.end();
			});
		})
	app.all("/global/img/*", function(req, res)
		{
		var q = url.parse(req.url, true);
	  	var filename = "./pages/" + q.pathname;
		fs.readFile(filename, function(err, data) 
			{
			if (err) 
				{
				res.writeHead(404, 	{'Content-Type': 'text/html'	});
				return res.end("404 Not Found");
				}  
			res.writeHead(200, 	{'Content-Type': 'text/javascript'	});
			res.write(data);
			res.end();
			});
		})
	}