var http = require('http');
var url = require('url');
var querystring = require('querystring');
var info ={};

var server = http.createServer(function(req, res) {

	

	info=url.parse(req.url,true).query;
	req.on('data', function(chunk){

	info += chunk;

	})
	console.log(info);

	req.on('end', function(){

	info = querystring.parse(info);

	if(info.name == 'xjj' && info.pwd =='123'){

	res.end('login success ' + info.name);

	}else{

	res.end('login failed ' + info.name);

	}

	});

});

server.listen(8888);