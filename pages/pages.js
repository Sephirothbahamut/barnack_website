var url = require('url');
var fs = require('fs');
var ejs = require("ejs");

var visitors = 0;

exports.init = function init(app)
	{
	//specific cases
	
	app.post("/api/*", function(req, res)
		{
		var api_controller = require(__dirname + "/../api/controller.js");
		api_controller(req, res);
		});
	
	//all default pages
	app.all("/*", function(req, res)
		{
		if(!req.session.visitors)
			{
			visitors++;
			req.session.visitors = visitors;
			}
		
		var q = url.parse(req.url, true).pathname;
		console.log("Page request: " + '"' + q + '"');
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
			fs.readFile(__dirname + "/global/footer.ejs", function(err, footer) 
				{
				fs.readFile(__dirname + string + "/page.ejs", function(err, page) 
					{
					if(!err)
						{
						var args = 
							{
							color_scheme: "dark",
							visitors: visitors
							};
						
						var parts =
							{
							navbar: ejs.render(navbar.toString(), args),
							header: ejs.render(header.toString(), args),
							footer: ejs.render(footer.toString(), args)
							};
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.write(ejs.render(page.toString(), {args: args, parts: parts, session: req.session}));
						res.end();
						}
					else
						{
						fs.readFile(__dirname + "/404/page.ejs", function(err, page) 
							{
							if(!err)
								{
								var args = 
									{
									color_scheme: "dark",
									visitors: visitors
									};
								
								var parts =
									{
									navbar: ejs.render(navbar.toString(), args),
									header: ejs.render(header.toString(), args),
									footer: ejs.render(footer.toString(), args)
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
		});
	}
