// node 框架

// Express API :http://www.expressjs.com.cn/4x/api.html    
// http://expressjs.jser.us/3x_zh-cn/api.html
var express = require('express');               
var path    = require('path');
var fs      = require('fs'); 
var http    = require('http');

var favicon = require('serve-favicon');         // Favicon是favorites icon的缩写，亦被称为website icon（网页图标）
var logger  = require('morgan');                // 日志插件 https://www.npmjs.com/package/morgan
var cookieParser  = require('cookie-parser');   // cookie https://www.npmjs.com/package/cookie-parser
var bodyParser    = require('body-parser');     // https://www.npmjs.com/package/body-parser
require('body-parser-xml')(bodyParser);         // https://www.npmjs.com/package/body-parser-xml

var debug   = require('debug')('myapp:server');

// -------------------------**正式开始配置**---------------------------//

var app = express();

/**
 * app.set 设置express配置的值
 * app.set(something,true) 等同于 app.enable(something)
 * app.set(something,false) 等同于 app.disable(something)
 *
 * 应用级设置：整个应用中都会受影响的设置  http://www.expressjs.com.cn/4x/api.html#app.set
 * `case sensitive routing` `env` `etag` `jsonp callback name` `json replacer` `json spaces` 
 * `query parser` `strict routing` `subdomain offset` `trust proxy` `views` `view cache` `view engine` `x-powered-by`
 */
app.set('views', path.join(__dirname, 'views'));  // 设置渲染模板目录
app.set('view engine', 'ejs');                    // 指定模板引擎

app.disable('x-powered-by');                      // 禁用头 X-Powered-By 

app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.xml());

/**
 * bodyParser()
 * http://expressjs.jser.us/3x_zh-cn/api.html
 * 支持 JSON, urlencoded和multipart requests的请求体解析中间件。 这个中间件是json(), urlencoded(),和multipart() 这几个中间件的简单封装
 * 
 * app.use(express.bodyParser());
 * 等同于:
 * app.use(express.json());
 * app.use(express.urlencoded());
 * app.use(express.multipart());
 */
app.use(bodyParser.json());                           // 解析json格式数据
app.use(bodyParser.urlencoded({ extended: true }));   // 解析form表单，false的时候存储值为String & Array ; true 可以为任意类型
// xml转换
app.use(bodyParser.raw({type : 'text/xml'}));
// 转换HTML body 为 string
app.use(bodyParser.text({type: 'text/html'}));

/**
 * https://github.com/expressjs/session
 * express-session V1.5.0后不需要cookie-parser中间件，就可以直接读写cookie，
 * 如果同时存在，就需要保证cookie-parser和express-session的secret值相同
 */
app.use(cookieParser('some_secret'));               // 生成签名后的cookie


// -------------------------------------------//
// 路由和静态资源加载顺序请注意啦😀
// 如果路由配置和静态资源下有 `相同匹配的路由`，那么会加载先配置的文件
// eg：
// 如下，先配置route，那么访问根目录时，会加载路由中的 `/` 匹配的路由，即 `view/index.ejs`
// 如果先配置static静态资源,访问根目录时，会加载静态资源中的 `static/index.html`
// -------------------------------------------//


/**
 * express.static 静态资源使用目录 
 */
app.use(express.static(path.join(__dirname, 'public')));
/**
 * 路由加载
 */
require('./routes/routes')(app);
app.use(express.static(path.join(__dirname, 'static')));

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log(`http://127.0.0.1:${addr.port}`)
}

app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
