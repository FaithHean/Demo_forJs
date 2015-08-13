var http = require('http');
var url = require('url');
//创建服务器
var server = http.createServer(function(req, res) {
	var info ={};
	res.writeHead(200);
	info.name = url.parse(req.url,true).query.name;
	info.password = url.parse(req.url,true).query.pwd;
	if(info.name == 'xjj'&& info.password=='123'){
		res.write('success login');
		res.end();
		console.log('success login :'+ info.name);
	}else{
		res.write('fail login');
		res.end();
		console.log('fail login');
	}

}).listen(8888,function(){
	console.log('server is running at 8888');
});