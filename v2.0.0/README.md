## 目录

以下是分解之后的目录

``
|- build // webpack 配置目录
|-- entry.config.js
|-- module.config.js
|-- output.config.js
|-- plugins.config.js
|- src // 开发目录
|-- css
|-- data
|-- image
|-- javascripts
|--- suspectComponent.vue
|--- suspectRelatedComponent.vue
|-- app.vue
|- index.html
|- main.js
|- package.json
|- webpack.config.js
``

本来是想着最后一个版本在把 webpack 集成进来, 但是静态文件除了使用 require.js sea.js和common.js 外不能完全分解 html, 于是这个版本先简单的引入 webpack, 主要目的还是分解 html。

> 改动

之前局部组件通信是重新定义了一个 vue, 分解组件代码之后子组件使用当前实例上的 $emit 来发送消息到父组件, 父组件通过节点监听到数据后把数据传给对应的方法。

## 安装项目依赖

`
npm install babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015 babel-preset-stage-0 babel-runtime --save
npm install vue vue-loader vue-html-loader vue-hot-reload-api --save
npm install css-loader style-loader file-loader --save
npm install webpack webpack-cli webpack-dev-server vue-template-compiler --save-dev
`

## 配置开发环境和生产环境

package.json

```
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --mode production --config webpack.config.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --mode development --config webpack.config.js"
  },
```

## 启动参数详解

cross-env 插件用来统一 window/linux 启动方式。
NODE_ENV 配置全局生产环境和开发环境
webpack 插件在 build 中使用该命令对文件进行打包。
webpack-dev-server 插件启动项目并监听端口。
--mode 配置 webpack 启动是生产环境还是开发环境。
--config 指定配置文件

## 启动命令

npm run build // 生产环境: 对开发文件进行静态打包 
npm run dev   // 开发环境: 启动服务并监听文件的变化

## 开发环境

使用 npm run dev 时, 接收命令行传入的参数 const isDev = process.env.NODE_ENV === 'development';
当环境是开发环境时给 config 配置监听端口/热更新插件/报错插件等。