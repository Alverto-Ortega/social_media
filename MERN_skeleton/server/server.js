import config from './../config/config';
import app from './express';
import mongoose from 'mongoose';

//starting the server
app.listen(config.port, (err) => {
    if(err){
        console.log(err)
    }
    console.info('Server started on port %s.', config.port);
});

//configure to use native ES6 promises and handle the connection to the mongodb database for project
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', () => {
    throw new Error('Unable to connect to database: ${mongoUri}');
});