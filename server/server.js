//set up server
//express app
import express from 'express';
import devBundle from './devBundle'; //only for development mode, comment out when in production mode
import path from 'path';
import template from './../template';
import { MongoClient } from 'mongodb';

const app = express();
devBundle.compile(app);//only for development mode, comment out when in production mode

//serving static files from the dist folder
//configs express app to return static files from the dist folder when requested
//route starts with /dist
const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

//route-handling to receive GET request at /: which is the root URL
//rendering templates at the root
app.get('/', (req, res) => {
    res.status(200).send(template());
});

//start a server that listens on specified port for incoming requests:
let port = process.env.PORT || 3000;
app.listen(port, function onStart(err){
    if(err){
        console.log(err);
    }
    console.info('Server started on port %s.', port);
});

//connect NOde server to MongDb
const url = process.env.MONGODB_URI ||  'mongodb://localhost:27017/mernSimpleSetup';

MongoClient.connect(url, (err, db) => {
    console.log("Connected Successfully to mongodb server");
    db.close();
});