import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
var path = require('path');

import router from "./routers/v1";
import config from "./config/main";

// init express
const app = express();

// init mongoose
mongoose.connect(config.db);

// init express middleware
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.use(logger("dev"));
app.use(helmet());
app.use(cors());

app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

//routers
router(app);

// init server
let server;
if (process.env.NODE_ENV !== config.test_port) {
  server = app.listen(config.port);
  console.log(`Server listening on ${config.port}`);
} else {
  server = app.listen(config.test_port);
  console.log(`Server listening on ${config.test_port}`);
}

//export
export default server;
