
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const Employees = require('../database/models/employees')

router.get('/get', (req, res) => {

    Employees.find({})
        .then((employees) => {
            //console.log(employees)
            //console.log("Employees Pulled")
            res.json({ employees, message: "Employees pulled successfully", code: "200" })
        })
        .catch(error => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })
})

router.post('/signup', async (req, res) => {

    console.log(req.body.data)

    let employeeNew = new Employees(req.body.data)
    console.log(employeeNew)
    let encryptedpword = await bcrypt.hash(employeeNew.password, 10)
    employeeNew.password = encryptedpword

    Employees.findOne({ "emp_id": employeeNew.emp_id }, (err, emp) => {
        if (emp) {
            res.json({ message: "Employee already exists", code: "409" })
        }
        else {
            new Employees(employeeNew)
                .save()
                .then((employee) => {
                    console.log(employee)
                    console.log("Created New Employee")                    
                    res.json({ employee, message: "Account created successfully", code: "200" })
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
    let password = req.body.data.password

    Employees.findOne({ "emp_id" : emp_id })
        .then((employee) => {
            if (employee && bcrypt.compareSync(password, employee.password)) {                
                console.log(employee)
                console.log("Employee " + employee.emp_id + " Logged In")
                res.json({ employee, message: "Account logged in successfully", code: "200" })
            } else if (employee && !bcrypt.compareSync(password, employee.password)) {
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

router.patch('/edit', (req, res) => {

    console.log(req.body.data)

    Employees.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
        .then((employee) => {
            console.log(employee)
            console.log("Employee " + employee._id + " Edited")
            res.json({ employee, message: "Account logged in successfully", code: "200" })
         })
        .catch((error) => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })

})

router.delete('/delete', (req, res) => {

    console.log(req.body.data)

    Employees.findOneAndDelete({ "_id": req.body.data._id })
        .then((employee) => {
            console.log(employee)
            console.log("Delete Successful")            
            res.json({ employee, message: "Account Deleted successfully", code: "200" })
        })
        .catch((error) => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })
})

//router.get('/:id', (req, res) => {
//    Employees.findOne({})
//        .then(employees => res.send(employees))
//        .then(() => {
//            console.log("Get Successful")
//            console.log(employees)
//        })
//        .catch(error => console.log(error))
//})

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