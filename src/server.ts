import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import bodyParser from 'body-parser';
import todoRoute from './routes/todo';
import authRoute from './routes/auth';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//mongo
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Mongo connected successfully.');
    })
    .catch((error) => Logging.error(error));

// middleware

// routes
app.use('/todo', todoRoute);
app.use('/auth', authRoute);
app.get('/', async (req, res) => {
    res.send('hello , api server is working!!');
});

// public images folder
//build https://stackoverflow.com/questions/68240921/serve-static-files-with-expressjs-typescript-nodejs
app.use('/images', express.static('public/images'));

app.listen(config.server.port, () => {
    console.log(`app listening on port ${config.server.port}`);
});
