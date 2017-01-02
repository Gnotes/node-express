# node-express

## 快速生成express-demo

```bash
npm install -g express-generator          # 全局安装express-generator

express path/Your_Project_Name            # 生成express demo

cd path/Your_Project_Name && npm install  # 进入目录并安装npm 包

npm start                                 # 启动
```

```bash
express --help                        # 查看express其他参数项

-e  --ejs                             # ejs   模板支持
    --pug                             # pug   模板支持
    --hbs                             # hbs   模板支持
    --hogan                           # hogan 模板支持

-v  --view <engine>                   # 指定使用模板,ejs|hbs|hjs|jade|pug|twig|vash, 默认jade
-c  --css  <engine>                   # 指定样式表引擎,less|stylus|compass|sass, 默认css
```

## 路由

[路由配置](Router.md)

**参考文档**

- [Express github](https://github.com/expressjs/express)
- [Express website](http://www.expressjs.com.cn/)
- [Express API 4.x](http://www.expressjs.com.cn/4x/api.html)
- [Express API 3.x](http://expressjs.jser.us/3x_zh-cn/api.html)
- [Express Router](http://lostjs.com/2014/04/24/router-in-express-4)

**middleware**

- [serve-favicon](https://www.npmjs.com/package/serve-favicon) Favicon是favorites icon的缩写，亦被称为website icon（网页图标）
- [morgan](https://www.npmjs.com/package/morgan) 日志插件
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) cookie 解析
- [body-parser](https://www.npmjs.com/package/body-parser) html body 解析
- [body-parser-xml](https://www.npmjs.com/package/body-parser-xml) xml 解析
- [express-router](http://lostjs.com/2014/04/24/router-in-express-4/) express 路由