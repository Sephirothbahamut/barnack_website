var url = require('url');
var fs = require('fs');
var ejs = require("ejs");

exports.init = function init(app)
	{
	//specific cases
	app.get("/api", function(req, res)
		{
		res.end();
		});
	
	//all default pages
	app.all("/*", function(req, res)
		{
		var q = url.parse(req.url, true).pathname;
		//console.log("Requested" + '"' + q + '"');
		var arr = q.split("/").filter(function(str){return(str.length != 0);});
		if(arr.length == 0)
			{q = "/index";}
		if(arr[0] == "global")
			{//css
			fs.readFile(__dirname + q, function(err, file) 
				{
				if(!err)
					{
					res.write(file);
					res.end();
					}
				else
					{
					console.log(err);
					}
				});
			}
		else
			{//pages
			send_page(req, res, q);
			}
			
		});
	}
	
function send_page(req, res, string)
	{
	fs.readFile(__dirname + "/global/header.ejs", function(err, header) 
		{
		fs.readFile(__dirname + "/global/navbar.ejs", function(err, navbar) 
			{
			fs.readFile(__dirname + string + "/page.ejs", function(err, page) 
				{
				if(!err)
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
					res.write(ejs.render(page.toString(), {args: args, parts: parts}));
					res.end();
					}
				else
					{
					fs.readFile(__dirname + "/404.html", function(err, page) 
						{
						if(!err)
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
							res.writeHead(404, {'Content-Type': 'text/html'});
							res.write(ejs.render(page.toString(), {args: args, parts: parts}));
							res.end();
							}
						else
							{
							res.writeHead(500, {'Content-Type': 'text/html'});
							res.write("Error 500: Cannot find 404 error page.");
							res.end();
							}
						});
					}
				
				});
			});
		});
	}