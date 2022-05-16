const path = require("path");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require("dotenv");

module.exports = (env)=> {
    dotenv.config();
    const { SERVER = '' } = env;

    dotenv.config({path: `./env/${SERVER}.env`})
    console.log( env, 'API_SERVER', process.env.API_SERVER );

    return {
        // entry file - webpack이 실행될 파일
        // https://v4.webpack.js.org/configuration/entry/
        entry: {
            vendor: ["@babel/polyfill","core-js/stable","./src/js/main.js"],
            main: [ './src/js/common/common.js','./src/js/main.js'],
            pa: './src/page/page-a/js/page-a.js',
            pb: './src/page/page-b/js/page-b.js',
            pc: './src/page/page-c/js/page-c.js'
        },
        // 번들링된 js 파일의 이름(filename)과 저장될 경로(path)를 지정
        // https://v4.webpack.js.org/configuration/output/
        output: {
            path: path.join(__dirname, "dist"),
            filename: "[name].js",
            chunkFilename: '[name].bundle.js',
        },
        
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        enforce: true,
                        chunks: 'all'
                    }
                }
            }
        },
        
        module: {
            rules: [
            {
                test: /\.m?js$/, // source: https://webpack.js.org/loaders/babel-loader/
                exclude: /(node_modules|bower_components)/,
                /*
                test: /\.js?$/,
                include: [path.resolve(__dirname, "src/js")],
                exclude: /node_modules/,
                */
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                ]
            },
            ],
        },
        devtool: "source-map",
        // https://v4.webpack.js.org/configuration/mode/
        mode: "development",
        
        devServer: {
            //publicPath: "./src/",
            //contentBase: path.join(__dirname, "dist"), // 콘텐츠를 제공할 경로지정
            static: {
                directory: path.join(__dirname, "dist")
            },
            compress: true, // 모든 항목에 대해 gzip압축 사용
            hot: true, // HRM(새로 고침 안해도 변경된 모듈 자동으로 적용)
            port: 9000, // 접속 포트 설정
        },
        
        plugins: [
            new webpack.DefinePlugin({
                'process.env.API_SERVER': JSON.stringify(process.env.API_SERVER)
            }),
            new webpack.EnvironmentPlugin(['API_SERVER']),
            
            new CleanWebpackPlugin({
                cleanAfterEveryBuildPatterns: ["dist", "public"],
            }),

            new HtmlWebpackPlugin({
                template: "./src/index.html",     // 적용될 html 경로
                filename: "./public/index.html", // 결과 파일명
                chunks: ['main'],
                meta: {
                    // meta 태그를 추가
                    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                },
                hash: true,       // 모든 스크립트, css 파일에 고유한 컴파일 해시 추가하여 캐시를 무효화
                showErrors: true, // 오류 정보가 html에 기록됨
            }),

            new HtmlWebpackPlugin({
                template: "./src/page/page-a/page-a.html",     // 적용될 html 경로
                filename: "./public/pa/pa.html", // 결과 파일명
                chunks: ['pa'],
                meta: {
                    // meta 태그를 추가
                    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                },
                hash: true,       // 모든 스크립트, css 파일에 고유한 컴파일 해시 추가하여 캐시를 무효화
                showErrors: true, // 오류 정보가 html에 기록됨
            }),
            
            new HtmlWebpackPlugin({
                template: "./src/page/page-b/page-b.html",     // 적용될 html 경로
                filename: "./public/pb/pb.html", // 결과 파일명
                chunks: ['pb'],
                meta: {
                    // meta 태그를 추가
                    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                },
                hash: true,       // 모든 스크립트, css 파일에 고유한 컴파일 해시 추가하여 캐시를 무효화
                showErrors: true, // 오류 정보가 html에 기록됨
            }),

            new HtmlWebpackPlugin({
                template: "./src/page/page-c/page-c.html",     // 적용될 html 경로
                filename: "./public/pc/pc.html", // 결과 파일명
                chunks: ['pc'],
                meta: {
                    // meta 태그를 추가
                    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                },
                hash: true,       // 모든 스크립트, css 파일에 고유한 컴파일 해시 추가하여 캐시를 무효화
                showErrors: true, // 오류 정보가 html에 기록됨
            }),
        
        ],

        target: ["web", 'es5'],
    };
        
}