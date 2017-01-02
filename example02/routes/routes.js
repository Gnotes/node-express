//---------------------------------------------------------//
//                  路由配置
// http://lostjs.com/2014/04/24/router-in-express-4
//---------------------------------------------------------//

/**
 * 加载路由
 *
 * 由于app.js中配置了如下代码才可以加载指定目录下的ejs模板
 * app.set('views', path.join(__dirname, 'views'));  // 设置渲染模板目录
 * app.set('view engine', 'ejs');                    // 指定模板引擎
 */
var view_index      = require('./index');
var view_other      = require('./other');
var view_default    = require('./default');

var api_message     = require('../controllers/message');
var api_common      = require('../controllers/common');

module.exports = function (app) {

    /**
     * view 路由
     */
    app.use('/',view_index);
    app.use('/other', view_other);

    /**
     * API 路由
     */
    app.get('/api/message', api_message.message);


    // 默认接口 - 放到最后面
    app.all('/api/*', api_common.default);
    // 默认页面路由 - 放到最后面
    app.use('/*', view_default);
}
