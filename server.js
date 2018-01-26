import * as express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import * as helmet from 'helmet'
import * as cors from 'cors'

import router from './routers/v1'
import config from './config/main'

// init express
const app = express();

// init mongoose
mongoose.connect(config.db);

// init express middleware
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());

//routers
router(app);

// init server
let server;
if(process.env.NODE_ENV !== config.test_port){
    server = app.listen(config.port);
    console.log(`Server listening on ${config.port}`);
}else{
    server = app.listen(config.test_port);
    console.log(`erver listening on ${config.test_port}`);
}

//export
export default server;