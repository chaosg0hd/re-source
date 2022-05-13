const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const path = require('path');

const user = "HeadDev";
const password = "Aa1234567";
const database = "MSSE";

const uri ="mongodb+srv://" + user + ":" + password + "@resourcecluster.7j9mt.mongodb.net/" + database + "_db?retryWrites=true&w=majority";


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((error) => {
        console.log(error)
        console.log("Connection Failed");
    });

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

//CHECK CONN

//app.use('/api/check/', (req, res, next) => {
//    const content = [
//        {
//            message: "Successfully Connected"
//        }
//    ]
//    res.status(200).json({
//        content: content,
//        message: "Connected Succesfully",
//        status: 200,
//    })

//    console.log("Request Received");
//    next();
//});

//Routers

//SYSTEM

const announcementsRouter = require('./routes/announcements'); //OK
app.use("/api/announcements", announcementsRouter); 

////EMP

const employeesRouter = require('./routes/employees'); //OK
app.use("/api/employees", employeesRouter);

////TIME KEEPING

const timesRouter = require('./routes/times'); //OK
app.use("/api/times", timesRouter);
const attendancesRouter = require('./routes/attendances');//OK
app.use("/api/attendances", attendancesRouter);

//INVENTORY

const inventoriesRouter = require('./routes/inventories');//OK
app.use("/api/inventories", inventoriesRouter);

////FINANCES

const petty_cashRouter = require('./routes/petty_cash');///OK
app.use("/api/petty_cash", petty_cashRouter);
const expensesRouter = require('./routes/expenses');//OK
app.use("/api/expenses", expensesRouter);
const revenuesRouter = require('./routes/revenues');//OK
app.use("/api/revenues", revenuesRouter);
const payrollsRouter = require('./routes/payrolls');//OK
app.use("/api/payroll", payrollsRouter);
const purchasesRouter = require('./routes/purchases');//OK
app.use("/api/purchases", purchasesRouter);
const salesRouter = require('./routes/sales');//OK
app.use("/api/sales", salesRouter);

////TASKS

const task_boardsRouter = require('./routes/task_boards');//OK
app.use("/api/task_boards", task_boardsRouter);

////GALLERIES

const galleriesRouter = require('./routes/galleries');//OK
app.use("/api/galleries", galleriesRouter);

////FILE

const filesRouter = require('./routes/files');//OK
app.use("/api/files", filesRouter);


//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//app.all((req, res, next) => {
//    /*res.send("Nothing Here, Ignore Me");*/
//    console.log("Log From: server/app.js");
//});


module.exports = app;