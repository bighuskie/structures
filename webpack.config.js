//webpack是node写出来的，需要用node的写法
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    devServer: {
        //开发服务器的配置
        port: 3000,
        progress: true, //进度条
        contentBase: "./dist", //以dist文件夹的文件为运行入口
        compress: true,
        open: true //自动打开
    },
    mode: "development", //模式，默认有两种production和development
    entry: "./src/assets/js/main.js", //文件入口
    output: {
        filename: "build.js", //打包后的文件名
        path: path.resolve(__dirname, "dist") //打包路径，必须时绝对路径
    },
    plugins: [
        //放置所有插件
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            //压缩html文件
            minify: {
                removeAttributeQuotes: true, //去掉html文件的引号
                collapseWhitespace: true //去掉空格
            }
        }),
        new MiniCssExtractPlugin({ //将css独立为一个文件而不是插入head标签内
            filename: "css/index.css"
        }),
        new OptimizeCss(), //优化\最小化CSS
        new webpack.ProvidePlugin({ //在每个模块中注入$
            $: "jquery"
        }),
        // new CleanWebpackPlugin(["./dist"]) //每次打包前删除文件夹
    ],
    module: {
        //模块配置
        //配置规则
        rules: [{
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                //loader的顺序默认是从右向左执行(从下往上)
                use: [
                    /* { 
                         loader: "style-loader", //把css插入head标签中
                         options: {
                             insertAt: "top" //css插入head标签的位置
                         }
                       },
                    */
                    MiniCssExtractPlugin.loader, //将css独立为一个文件而不是插入head标签内
                    "css-loader", //解析@import这种语法
                    "postcss-loader" //增加样式前缀
                ]
            }, {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, //将css独立为一个文件而不是插入head标签内
                    "css-loader", //解析@import这种语法
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.html$/,
                use: "html-withimg-loader"
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1,
                        outputPath: "images/"
                    }
                }
            }
        ]
    },
    devtool: "eval-source-map", //源码映射，出错了会标识当前报错的列和行，方便调试
    resolve: { //解析第三方包
        modules: [path.resolve("node_modules")],
        //去除文件扩展名
        extensions:[".js",".less",".vue"]
        // alias:{//第三方包起别名
        //     bootstrap:"bootstrap/dist/css/bootstrap.css"
        // }
    }
};