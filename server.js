/**
 * Created by Freax on 17-1-19.
 * @blog http://www.myfreax.com
 */
const express = require('express');
const app = express();
const config = require('./webpack.config');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(config);
const opn = require('opn');

const port = 3000;

app.use(webpackDevMiddleware(compiler, {
    publicPath:config.output.publicPath,    //require
    stats: {
        colors: true,
        chunks: false
    },
}));

app.use(webpackHotMiddleware(compiler));

//serve static content
app.use('/assets', express.static('./assets'));

app.listen(3000, err =>{
    if (err) {
        console.log(err);
        return
    }

    let uri = 'http://localhost:' + port;
    ///opn(uri);
    console.log('Listening at ' + uri + '\n');
});
