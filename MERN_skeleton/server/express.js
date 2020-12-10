import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

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

export default app;
    