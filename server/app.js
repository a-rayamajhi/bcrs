/*
============================================
; Title: App Configuration
; Author: Professor Krasso
; Date:  16 Apr 2021
; Modified by: Rayamajhi, Perry, Wong
;===========================================
*/

/**
 * Require statements
 */
const express = require("express");
const http = require("http");
const morgan = require("morgan");
// deprecated, body parse is part of express now
// const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require("mongoose");

// API imports
const ProfileApi = require("./routes/index");
const UserApi = require("./routes/user-api");
const SessionApi = require("./routes/session-api");
const SecurityQuestionApi = require("./routes/security-question-api");
const InvoiceApi = require("./routes/invoice-api");
const RoleApi = require("./routes/role-api");

/**
 * App configurations
 */
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/bcrs")));
app.use("/", express.static(path.join(__dirname, "../dist/bcrs")));

/**
 * Variables
 * Include environment variable to auto assign port for deployment
 */
const port = process.env.PORT || 3000; // server port

// DB connection string
const conn =
  "mongodb+srv://bcrs_user:admin@ems.nvxn7.mongodb.net/bcrs?retryWrites=true&w=majority";

/**
 * Database connection
 */
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

/**
 * APIs
 */
app.use("/api", ProfileApi);
app.use("/api/users", UserApi);
app.use("/api/session", SessionApi);
app.use("/api/security-questions", SecurityQuestionApi);
app.use("/api/invoices", InvoiceApi);
app.use("/api/roles", RoleApi);

/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
