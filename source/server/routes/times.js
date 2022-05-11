//TIME
const express = require("express");
const router = express.Router();
const Time = require('../database/models/time');

router.get('/get', (req, res) => {

    Time.find({})
        .then((data) => {
            if (data != null) {
                res.json({ data, message: "Time pulled successfull", code: "200" })
            }
            else {
                console.log("Data Does Not Exist")
                res.json({ message: "Get failed", code: "404" })
            }            
        })
        .catch(error => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })
})

router.get('/get/:_id', (req, res) => {

    if (req.params._id == undefined) {
        console.trace()

    } else {
        console.log(req.params._id)
    }    

    Time.findOne({ "emp_id": req.params._id })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Time " + data._id + " Get")
                res.json({ data, message: "Get successfull", code: "200" })
            }
            else {
                console.log("Data Does Not Exist")
                res.json({ message: "Get failed", code: "404" })
            }
        })
        .catch(error => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })

})

router.patch('/edit', (req, res) => {

    console.log(req.body.data)

    Time.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Time " + data._id + " Edited")
                res.json({ data, message: "Edit successfull", code: "200" })
            }
            else {
                console.log("Data Does Not Exist")
                res.json({ message: "Patch failed", code: "404" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })

})

router.delete('/delete/:_id', (req, res) => {

    if (req.params._id == undefined) {
        console.trace()

    } else {
        console.log(req.params._id)
    }

    Time.findOneAndDelete({ "_id": req.body.data._id })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Delete Successful")
                res.json({ data, message: "Delete successfull", code: "200" })
            }
            else {
                console.log("Data Does Not Exist")
                res.json({ message: "Delete failed", code: "404" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        })
})


router.post('/new', (req, res) => {

    console.log(req.body.data)

    new Time(req.body.data)
        .save()
        .then((data) => {
            console.log(data)
            console.log(data.emp_id + " Has Time Logged")
            res.json({ data, message: "Succesfully Time Logged", code: "200" })

        })
        .catch((error) => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        })

});

router.get('/check/:emp_id', (req, res) => {

    if (req.params.emp_id == undefined) {
        console.trace()

    } else {
        console.log(req.params._id)
    }

    Time.findOne({ "emp_id": req.params.emp_id })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Time " + data._id + " Get")
                res.json({ data, message: "Get successfull", code: "200" })
            }
            else {
                console.log("Data Does Not Exist")
                res.json({ message: "Get failed", code: "404" })
            }
        })
        .catch(error => console.log(error))
});

router.post('/timein', (req, res) => {

    console.log(req.body)

    new Time(req.body.data)
        .save()
        .then((data) => {
            console.log(data.emp_id + ' Has Timed In')
            console.log(data)
            res.json({ data, message: "Succesfully Timed In", code: "200" })
        })
        .catch(error => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        });

});

router.post('/timeout', (req, res) => {

    console.log(req.body)

    Time.findOneAndDelete({ "emp_id": req.body.data.emp_id })
        .then((data) => {

            console.log(data)

            //MORE IF HERE

            let dateNow = new Date();
            let dateOld = new Date(data.createdAt);
            seconds = dateNow.getTime() - dateOld.getTime();

            console.log(data.emp_id + " Has Timed Out");
            console.log(data)
            res.json({ data, seconds : seconds, message: "Succesfully Timed Out", code : "200" } )
        })
        .catch(error => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        });

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