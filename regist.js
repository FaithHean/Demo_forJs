var redis = require('redis');
var http = require('http');
var url = require("url");
var querystring = require("querystring");
http.createServer(function (req, res) {
    var postData = ""; //name=xjj&password=123
    // 数据块接收中
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);//解析post来的name&password
        console.log(params);
        console.log(params["name"]);
        console.log(params["password"]);
        PushToRedis(params["name"]);
        PushToRedis(params["password"]);
        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("用户名和密码提交redis数据库完毕！^_^");
    });
}).listen(8888, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8888/');

//表单接收完成后，再处理redis部分
function PushToRedis(info) {
    var client = redis.createClient();
    //将数据压缩到列表TestList
    client.lpush("TestList", info);
    console.log("PushToRedis:" + info);
    client.lpop("TestList", function (i, o) {
        console.log(o);//回调，所以info可能没法得到o的值，就被res.write输出了
    })
    client.quit();
}