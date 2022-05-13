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

    Time.findOne({ "_id": req.params._id })
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

    Time.findOneAndDelete({ "_id": req.params._id })
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
            time_seconds = dateNow.getTime() - dateOld.getTime();

            console.log(data.emp_id + " Has Timed Out");
            console.log(data)
            res.json({ data, seconds : seconds, message: "Succesfully Timed Out", code : "200" } )
        })
        .catch(error => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        });

});

module.exports = router;