const express = require("express");
const multer = require('multer');
const router = express.Router();
const path = require('path');

const TaskBoard = require('../database/models/taskboard');

//const MIME_TYPE_MAP = {
//    'image/png': 'png', 
//    'image/jpeg': 'jpg',
//    'image/jpg': 'jpg'
//};

//const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//        const isValid = MIME_TYPE_MAP[file.mimetype];
//        let error = new Error('Invalid mime type');
//        if(isValid) { error = null; } 
//        cb(error, path.join(__dirname, '../uploads/taskboard'));
//    },
//    filename: (req, file, cb) => {
//        const ext = MIME_TYPE_MAP[file.mimetype];
//        cb(null, 'image-' + Date.now() + '.' + ext);
        
//   }
//});

//const upload = multer({storage: storage});

//router.post("/", upload.single('file'), (req, res, next) => {
//    console.log(req.body);
//    if(!req.file) {
//        return res.status(500).send({ message: 'Upload Failed'});
//    } else {
//        req.body.imageUrl = 'http://localhost:3000/uploads/taskboard/' + req.file.filename;
//        req.body.isArchive = 0;
//        (new TaskBoard(req.body))
//        .save()
//        .then((taskboard) => res.send(taskboard))
//        .catch((error) => (error));
//    }
//// router.post('/', multer({storage: storage}).single("image"), (req, res) => {  
////     (new Taskboard(req.body.data))
////     .save()
////     .then((inventory) => res.send(inventory))
////     .catch((error) => console.log(error));
    
//// });

/*});*/


router.get('/get', (req, res) => {

    TaskBoard.find({})
        .then((data) => {
            if (data != null) {
                res.json({ data, message: "Taskboard pulled successfull", code: "200" })
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

    TaskBoard.findOne({ "_id": req.params._id })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Taskboard " + data._id + " Get")
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

    TaskBoard.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Taskboard " + data._id + " Edited")
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

    TaskBoard.findOneAndDelete({ "_id": req.body.data._id })
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

    new TaskBoard(req.body.data)
        .save()
        .then((data) => {
            console.log(data)
            console.log(data._id + " Has Taskboard Logged")
            res.json({ data, message: "Succesfully Taskboard Logged", code: "200" })

        })
        .catch((error) => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        })

});
module.exports = router;
