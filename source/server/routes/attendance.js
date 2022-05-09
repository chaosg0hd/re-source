
const express = require("express");
const router = express.Router();

const Attendance = require('../database/models/attendance');

router.get('/get', (req, res) => {

    Attendance.find({})
        .then((attendance) => {
            //console.log(attendance)
            //console.log("Attendance Pulled")
            res.json({ attendance, message: "Attendance pulled successfully", code: "200" })
        })
        .catch(error => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })
})


router.post('/new', (req, res) => {

    console.log(req.body.data)
    new Attendance(req.body.data)
        .save()
        .then((attendance) => {
            console.log(attendance.emp_id + " Has Time Logged")
            console.log(attendance)
            res.json({ attendance, message: "Succesfully Time Logged", code: "200" })

        })
        .catch((error) => {
            /*console.log(attendance.emp_id + "Has Failed to Time Log")*/
            console.log(error)
            /*res.json({attendance, message: "Failed to Time Log", code: "500" })*/
        });
    
});



router.patch('/edit', (req, res) => {

    console.log(req.body.data)

    Attendance.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
        .then((attendance) => {
            console.log(attendance)
            console.log("Attendance " + attendance._id + " Edited")
            res.json({ attendance, message: "Account logged in successfully", code: "200" })
        })
        .catch((error) => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })

})

//new Time(req.body.data)
//    .save()
//    .then(time => {
//        console.log(time.emp_id + ' Has Timed In')
//        console.log(time)
//        
//    })
//    .catch(error => {
//        console.log(time.emp_id + ' Has Failed to Time In')
//        console.log(error)
//        res.json({ time, message: "Failed to Time In", code: "500" })
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