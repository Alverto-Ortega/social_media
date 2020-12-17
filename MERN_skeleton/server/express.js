import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import devBundle from "./devBundle";
import path from 'path';

const app = express();
    /*..configure express to accept HTTP requests ... */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
//send it in the response to a GET request for the / route
app.get('/', (req, res) => {
    res.status(200).send(Template());
});

//mount,makes routes defined in auth.routes.js accessible from client side
app.use('/', userRoutes);
app.use('/', authRoutes);

//auth error handling for express-jwt
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError'){
        res.status(401).json({"error": err.name + ": " + err.message});
    }else if (err){
        res.status(400).json({"error": err.name + ": " + err.message});
        console.log(err);
    }
});
//import middle , client-side webpack config, initiatie webpack to compile and bundle client-side code and enable hot reloading.
//bundles code with be places in dist folder, which willl be needed to render views.
devBundle.compile(app); //only use when in development, otherwise comment out

//config to serve static files from dist folder
const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

export default app;
    