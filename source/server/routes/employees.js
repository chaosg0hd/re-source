
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const Employee = require('../database/models/employee')

router.get('/get', (req, res) => {

    Employee.find({})
        .then((data) => {
            if (data != null) {
                res.json({ data, message: "Employees pulled successfull", code: "200" })
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

    Employee.findOne({ "_id": req.params._id })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Employees " + data._id + " Get")
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

    Employee.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Employees " + data._id + " Edited")
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

    Employee.findOneAndDelete({ "_id": req.body.data._id })
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

    new Employee(req.body.data)
        .save()
        .then((data) => {
            console.log(data)
            console.log(data.emp_id + " Has Employees Logged")
            res.json({ data, message: "Succesfully Employees Logged", code: "200" })

        })
        .catch((error) => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        })

});


router.post('/signup', async (req, res) => {

    console.log(req.body.data)

    let empNew = new Employee(req.body.data)
    console.log(empNew)
    empNew.emp_password = await bcrypt.hash(empNew.emp_password, 10)

    Employee.findOne({ "emp_id": empNew.emp_id }, (err, emp) => {
        if (emp) {
            res.json({ message: "Employee already exists", code: "409" })
        }
        else {
            new Employee(empNew)
                .save()
                .then((data) => {
                    console.log(data)
                    console.log("Created New Employee")                    
                    res.json({ data, message: "Account created successfully", code: "200" })
                })
                .catch((error) => {
                    console.log(error)
                    res.json({ message: "Something Went Wrong", error: error, code: "500" })
                })
        }
    })
})

router.post('/login', async (req, res) => {

    console.log(req.body.data)

    let emp_id = req.body.data.emp_id
    let emp_password = req.body.data.emp_password

    Employee.findOne({ "emp_id" : emp_id })
        .then((data) => {
            if (data && bcrypt.compareSync(emp_password, data.emp_password)) {                
                console.log(data)
                console.log("Employee " + data.emp_id + " Logged In")
                res.json({ data, message: "Account logged in successfully", code: "200" })
            } else if (data && !bcrypt.compareSync(emp_password, data.emp_password)) {
                console.log("Employee " + emp_id + " Invalid Login")
                res.json({ message: "Invalid Credentials", code: "401"})
            } else {
                console.log("Employee " + emp_id + " Not Exist")
                res.json({ message: "Account doesn't Exist", code: "404" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })
})







//router.put('/:id', (req, res) => {
//    Employees.findOneAndUpdate({"id": req.params}, {$set: req.body.data})
//        .then(employees => res.send(employees))
//        .catch(error => console.log(error))
//})

//router.patch('/:id', (req, res) => {
//    Employees.findOneAndUpdate({"id": req.params}, {$set: req.body.data})
//        .then(employees => res.send(employees))
//        .catch(error => console.log(error))
//})

module.exports = router