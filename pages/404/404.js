var fs = require('fs');

exports.send_page = function send_page(req, res)
	{
	fs.readFile(__dirname + "/404.html", function(err, data) 
		{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
		});
	}