
const express = require("express");
const router = express.Router();

const Attendance = require('../database/models/attendance');

router.get('/get', (req, res) => {

    Attendance.find({})
        .then((data) => {
            if (data != null) {
                res.json({ data, message: "Attendance pulled successfull", code: "200" })
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

    Attendance.findOne({ "_id": req.params._id })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Attendance " + data._id + " Get")
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

    Attendance.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Attendance " + data._id + " Edited")
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

    Attendance.findOneAndDelete({ "_id": req.body.data._id })
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

    new Attendance(req.body.data)
        .save()
        .then((data) => {
            console.log(data)
            console.log(data.emp_id + " Has Attendance Logged")
            res.json({ data, message: "Succesfully Attendance Logged", code: "200" })

        })
        .catch((error) => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        })

});



//router.patch('/edit', (req, res) => {

//    console.log(req.body.data)

//    Attendance.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
//        .then((attendance) => {
//            console.log(attendance)
//            console.log("Attendance " + attendance._id + " Edited")
//            res.json({ attendance, message: "Account logged in successfully", code: "200" })
//        })
//        .catch((error) => {
//            console.log(error)
//            res.json({ message: "Something Went Wrong", error: error, code: "500" })
//        })

//})

//new Attendance(req.body.data)
//    .save()
//    .then(attendance => {
//        console.log(attendance.emp_id + ' Has Attendanced In')
//        console.log(attendance)
//        
//    })
//    .catch(error => {
//        console.log(attendance.emp_id + ' Has Failed to Attendance In')
//        console.log(error)
//        res.json({ attendance, message: "Failed to Attendance In", code: "500" })
//    });

//router.get('/:_id', (req, res) => {
//    Attendance.findOne({})
//        .then(data => res.send(data))
//        .catch(error => console.log(error));
//});

//router.put('/:_id', (req, res) => {
//    Attendance.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
//        .then(data => res.send(data))
//        .catch(error => console.log(error));
//});

//router.patch('/:_id', (req, res) => {
//    Attendance.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
//        .then(data => res.send(data))
//        .catch(error => console.log(error));
//});

module.exports = router;