const fs = require(`fs`);
const fsextra = require('fs-extra');
const removeDirectory = require('delete');
const makeDirectory = require('mkdirp');


var buildConfig = require(`./build-config.js`);
var gameDir = `./src/${buildConfig.gameName}`;


let isRemoveConsoleLogs = buildConfig.isRemoveConsoleLogs;

removeDirectory.sync('./dist');
removeDirectory.sync(`${gameDir}/temp`);

makeDirectory(`${gameDir}/temp`, function (err) {
    if (err) console.error(err)
    else console.log('Directory created!')
});

const copyFilesAndDirectory=(src,dest)=>{
    console.log(">>>>src---"+src,dest);
    fsextra.copySync(src, dest);
};

let toCopy = [
    {from: `${gameDir}/assets/common/`,to:'./dist/assets/'},
    {from:`${gameDir}/assets/${buildConfig.gameType}/`,to:'./dist/assets/'},
    {from:`${gameDir}/assets/${buildConfig.gameType}/`,to:'./dist/assets/'}
];

for (let i=0;i<toCopy.length;i++){
    copyFilesAndDirectory(toCopy[i].from,toCopy[i].to);
}

const handlers = {
    spin36:'HttpHandler',
    spin12:'HttpHandler',
    spin36timer:'SfsHandler',
    spin12timer:'SfsHandler'
};

const serverData = require(`${gameDir}/config/server.js`);
const assetData = require(`${gameDir}/config/asset.js`);

const confImport = `import Server from '../components/${handlers[buildConfig.gameType]}.js';`;

const confData = `export default {server:Server,conf:${JSON.stringify(buildConfig)},serverData:${JSON.stringify(serverData[buildConfig.mode][buildConfig.gameType])},assets:${JSON.stringify(assetData[buildConfig.gameType])}}`;

/**/
try{
    //var confData = fs.readFileSync('./serverConfig.js');
    fs.writeFileSync(`${gameDir}/temp/conf.js`, confImport+'\n'+confData);

}catch(err){
    console.log("Error on loading the main js file:"+err);
}
/**/


// Webpack build creation
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

// Cryptojs library to convert from string to md5 format
const cryptoJsModule = path.join(__dirname, '/node_modules/crypto-js/');
const cryptojs = path.join(cryptoJsModule, 'crypto-js.js');


const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

let extraPlugins = [];
if (isRemoveConsoleLogs) {
  extraPlugins.push(new UglifyJSPlugin({
    uglifyOptions: {
      compress: {
        drop_console: true
      }
    }
  }))
}

module.exports = {
    mode:'production',
    entry: {
        app: [
          'babel-polyfill',
          path.resolve(__dirname, `${gameDir}/main.js`)
        ],
        vendor: ['pixi', 'p2', 'phaser', 'cryptojs']
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        filename: '[name].js'
    },
    optimization: {
        minimize:true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        definePlugin,
        new HtmlWebpackPlugin({
          filename: '../dist/index.html',
          template: `${gameDir}/index.html`,
          chunks: ['vendor', 'app'],
          chunksSortMode: 'manual',
          minify: {
            removeAttributeQuotes: false,
            collapseWhitespace: false,
            html5: false,
            minifyCSS: false,
            minifyJS: false,
            minifyURLs: false,
            removeComments: false,
            removeEmptyAttributes: false
          },
          hash: false
        })
    ].concat(extraPlugins),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /pixi\.js/,
                loader: ['expose-loader?PIXI']
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: /p2\.js/,
                loader: ['expose-loader?p2']
            },
            {
                test: /cryptojs\.js/,
                use: ['expose-loader?cryptojs']
            },
            {
                test: /phaser-input\.js$/,
                loader: 'exports-loader?PhaserInput=PhaserInput'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                   'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                   'file-loader'
                ]
            },
            {
                test: /\.(mp3|ogg)$/,
                use: [
                   'file-loader'
                ]
            }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2,
            'cryptojs': cryptojs
        }
    }
}
