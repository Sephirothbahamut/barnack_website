var vision_key = "b395bfa14739479b8b8349a50e90c235";
const microsofComputerVision = require("microsoft-computer-vision");



module.exports = function(req, res)
	{
	if(req.body.file_url)
		{//for url
		microsofComputerVision.analyzeImage(
			{
			"Ocp-Apim-Subscription-Key": vision_key,
			"content-type": "application/json",
			"url": req.body.file_url,
			"visual-features":"Tags, Faces",
			"request-origin":"westcentralus"
			}).then((result) => 
				{
				req.body.result = result;
				res.redirect(301, "/api_interface/image/result");
				}).catch((err)=>
				{
				console.log(err);
				res.writeHead(400, {'Content-Type': 'application/json'});
				res.write(JSON.stringify({error: "The request must contain an image"}));
				res.end();
				});
		return;
		}
		
	var file;
	if(req.files)
		{//for picture
		file = req.files.file;
		// Everything went fine
		microsofComputerVision.analyzeImage(
			{
			"Ocp-Apim-Subscription-Key": vision_key,
			"content-type": "application/octet-stream",
			"body": file.data,
			"visual-features":"Tags, Faces",
			"request-origin":"westcentralus"
			}).then((result) => 
				{
				req.session.result = result;
				res.redirect(301, "/api_interface/image/result");
				}).catch((err)=>
				{
				console.log(err);
				res.writeHead(400, {'Content-Type': 'application/json'});
				res.write(JSON.stringify({error: "The request must contain an image"}));
				res.end();
				});
		/*res.set('Content-Type', 'image/jpg')
		res.send(file.data);
		res.end();*/
		}
	else
		{
		res.writeHead(400, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({error: "The request must contain an image"}));
		res.end();
		}
	
	}
	
	