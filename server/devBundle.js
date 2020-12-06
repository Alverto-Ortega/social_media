//help compile react code using webpack configs while in dev mode

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './../webpack.config.client.js';

//compile method takes express app & configures it to use the webpack middleware 
//to compile, bundle, serve code and hot reloading in dev mode.
const compile = (app) => {
    if(process.env.NODE_ENV == "development"){
        const compiler =  webpack(webpackConfig);
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        });
        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));

    }
}

export default {
    compile
};