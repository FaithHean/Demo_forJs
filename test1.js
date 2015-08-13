var http = require('http');
var redis=require('redis');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var client=redis.createClient('6379','127.0.0.1');
    client.hmset('sessionid',{username1:'Xu',password1:'123',username2:'Z',password2:'456'},

        function (err) {
            console.log(err)
        })
    client.hgetall('sessionid', function (err, object) {
        console.log(object)
    })
    res.end('Welcome Redis\n');

}).listen(8888, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8888/');