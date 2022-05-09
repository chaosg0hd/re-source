//TIME
const express = require("express");
const router = express.Router();
const Time = require('../database/models/time');

router.get('/get', (req, res) => {

    Time.find({})
        .then((time) => {
            /*console.log(time)*/
            /*console.log("Time Pulled")*/
            res.json({ time, message: "Time pulled successfully", code: "200" })
        })
        .catch(error => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })
})

router.post('/timein', (req, res) => {

    console.log(req.body)

    new Time(req.body.data)
        .save()
        .then(time => {
            console.log(time.emp_id + ' Has Timed In')
            console.log(time)
            res.json({ time, message: "Succesfully Timed In", code: "200" })
        })
        .catch(error => {
            console.log(error)
        });

});

router.post('/timeout', (req, res) => {

    console.log(req.body)

    Time.findOneAndDelete({ "emp_id": req.body.data.emp_id })
        .then(time => {
            let dateNow = new Date();
            let dateOld = new Date(time.createdAt);
            seconds = dateNow.getTime() - dateOld.getTime();
            console.log(time.emp_id + " Has Timed Out");
            console.log(time)
            res.json({ time, seconds : seconds, message: "Succesfully Timed Out", code : "200" } )
        })
        .catch(error => {
            /*console.log(time.emp_id + ' Has Failed to Time OuT')*/
            console.log(error)
            /*res.json({ time, message: "Failed to Time Out", code: "200" })*/
        });

});

router.get('/check/:_id', (req, res) => {

    //console.log(req.params)

    Time.findOne({ "emp_id": req.params })
        .then(time => {
            if (time) {
                res.json({ time, message: "Successfully Pulled", code: "200" })
            }
            else {
                res.json({message: "No Time Record", code : "404"})
            }            
        })
        .catch(error => console.log(error));
});

//router.put('/:_id', (req, res) => {
//    Time.findOneAndUpdate({ "_id": req.params }, { $set: req.body.data })
//        .then(data => res.send(data))
//        .catch(error => console.log(error));
//});

//router.patch('/:_id', (req, res) => {
//    Time.findOneAndUpdate({ "_id": req.params }, { $set: req.body.data })
//        .then(data => res.send(data))
//        .catch(error => console.log(error));
//});

module.exports = router;

//router.get('/get', (req, res) => {

//    Time.find({})
//        .then((Time) => {
//            console.log(Time)
//            console.log("Time Pulled")
//            res.json({ Time, message: "Time pulled successfully", status: "200" })
//        })
//        .catch(error => {
//            console.log(error)
//            res.json({ message: "Something Went Wrong", error: error, status: "500" })
//        })
//})

//router.post('/signup', async (req, res) => {

//    console.log(req.body.data)

//    let employeeNew = new Time(req.body.data)
//    console.log(employeeNew)
//    let encryptedpword = await bcrypt.hash(employeeNew.password, 10)
//    employeeNew.password = encryptedpword

//    Time.findOne({ "emp_id": employeeNew.emp_id }, (err, emp) => {
//        if (emp) {
//            res.json({ message: "Employee already exists", status: "409" })
//        }
//        else {
//            new Time(employeeNew)
//                .save()
//                .then((employee) => {
//                    console.log(employee)
//                    console.log("Created New Employee")
//                    res.json({ employee, message: "Account created successfully", status: "200" })
//                })
//                .catch((error) => {
//                    console.log(error)
//                    res.json({ message: "Something Went Wrong", error: error, status: "500" })
//                })
//        }
//    })
//})

//router.post('/login', async (req, res) => {

//    console.log(req.body.data)

//    let emp_id = req.body.data.emp_id
//    let password = req.body.data.password

//    Time.findOne({ "emp_id": emp_id })
//        .then((employee) => {
//            if (employee && bcrypt.compareSync(password, employee.password)) {
//                console.log(employee)
//                console.log("Employee " + employee.emp_id + " Logged In")
//                res.json({ employee, message: "Account logged in successfully", status: "200" })
//            } else if (employee && !bcrypt.compareSync(password, employee.password)) {
//                console.log("Employee " + emp_id + " Invalid Login")
//                res.json({ message: "Invalid Credentials", status: "401" })
//            } else {
//                console.log("Employee " + emp_id + " Not Exist")
//                res.json({ message: "Account doesn't Exist", status: "404" })
//            }
//        })
//        .catch((error) => {
//            console.log(error)
//            res.json({ message: "Something Went Wrong", error: error, status: "500" })
//        })
//})

//router.patch('/edit', (req, res) => {

//    console.log(req.body.data)

//    Time.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
//        .then((employee) => {
//            console.log(employee)
//            console.log("Employee " + employee._id + " Edited")
//            res.json({ employee, message: "Account logged in successfully", status: "200" })
//        })
//        .catch((error) => {
//            console.log(error)
//            res.json({ message: "Something Went Wrong", error: error, status: "500" })
//        })

//})

//router.delete('/delete', (req, res) => {

//    console.log(req.body.data)

//    Time.findOneAndDelete({ "_id": req.body.data._id })
//        .then((employee) => {
//            console.log(employee)
//            console.log("Delete Successful")
//            res.json({ employee, message: "Account Deleted successfully", status: "200" })
//        })
//        .catch((error) => {
//            console.log(error)
//            res.json({ message: "Something Went Wrong", error: error, status: "500" })
//        })
//})