import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { allowedNodeEnvironmentFlags } from 'process';

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

export default app;
    