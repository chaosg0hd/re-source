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

const employeesRouter = require('./routes/employees');
const timesRouter = require('./routes/times');
const attendanceRouter = require('./routes/attendance');
const inventoriesRouter = require('./routes/inventories');

//const drawsRouter = require('./routes/draws');

//const expensesRouter = require('./routes/expenses');

//const pettycashRouter = require('./routes/pettycash');
//const purchasesRouter = require('./routes/purchases');
//const revenuesRouter = require('./routes/revenues');
//const salarytotalsRouter = require('./routes/salarytotals');
//const saldeltasRouter = require('./routes/saldeltas');
//const salesRouter = require('./routes/sales');
//const stocksRouter = require('./routes/stocks');
//const announcementRouter = require('./routes/announcements');
//const taskBoardRouter = require('./routes/taskboard');
//const payrollRouter = require('./routes/payroll');


//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/employees", employeesRouter);
app.use("/api/times", timesRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/inventories", inventoriesRouter);



//app.use("/api/draws", drawsRouter);
//app.use("/api/expenses", expensesRouter);

//app.use("/api/pettycash", pettycashRouter);
//app.use("/api/purchases", purchasesRouter);
//app.use("/api/revenues", revenuesRouter);
//app.use("/api/salarytotals", salarytotalsRouter);
//app.use("/api/saldeltas", saldeltasRouter);
//app.use("/api/sales", salesRouter);
//app.use("/api/stocks", stocksRouter);
//app.use("/api/announcements", announcementRouter);
//app.use("/api/taskboard", taskBoardRouter);
//app.use("/api/payroll", payrollRouter);
//

/*app.use("/api/users", usersRouter);*/





//app.all((req, res, next) => {
//    /*res.send("Nothing Here, Ignore Me");*/
//    console.log("Log From: server/app.js");
//});


module.exports = app;