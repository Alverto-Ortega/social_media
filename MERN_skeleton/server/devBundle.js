import config from "./../config/config";
import webpack from 'webpack';
import webpackMiddleware from  'webpack-dev-middleware';
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "./../webpack.config.client.js";

//integrate front and back end development flow
//set upp compile method taking express app and configs it to use webpack middleware.
//this method  enables hot reloading from server-side using webpack hot middlew
const compile = (app) => {
    if(config.env === "development"){
        const compiler = webpack(webpackConfig);
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        });
        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));
    }
};

export default{
    compile
};