const express = require("express");
const multer = require('multer');
const router = express.Router();
const path = require('path');

const Inventory = require('../database/models/inventory');

//const MIME_TYPE_MAP = {
//    'image/png': 'png',
//    'image/jpeg': 'jpg',
//    'image/jpg': 'jpg'
//};

//const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//        const isValid = MIME_TYPE_MAP[file.mimetype];
//        let error = new Error('Invalid mime type');
//        if (isValid) { error = null; }
//        cb(error, path.join(__dirname, '../uploads/'));
//    },
//    filename: (req, file, cb) => {
//        const ext = MIME_TYPE_MAP[file.mimetype];
//        cb(null, 'image-' + Date.now() + '.' + ext);

//    }
//});

//const upload = multer({ storage: storage });

//router.post("/", upload.single('file'), (req, res, next) => {
//    console.log(req.body);
//    if (!req.file) {
//        return res.status(500).send({ message: 'Upload Failed' });
//    } else {

//        req.body.imageUrl = 'http://localhost:3000/uploads/' + req.file.filename;
//        req.body.isArchive = 0;
//        (new Inventory(req.body))
//            .save()
//            .then((inventory) => res.send(inventory))
//            .catch((error) => (error));
//    }

//});

//router.post("/update", upload.single('file'), (req, res) => {
//    console.log(req.body);
//    if (!req.file) {
//        Inventory.findOneAndUpdate({ "_id": req.body.id }, { $set: req.body })
//            .then(inventory => res.send(inventory))
//            .catch(error => console.log(error));
//    } else {
//        req.body.imageUrl = 'http://localhost:3000/uploads/' + req.file.filename;
//        Inventory.findOneAndUpdate({ "_id": req.body.id }, { $set: req.body })
//            .then(inventory => res.send(inventory))
//            .catch(error => console.log(error));
//    }

//});


router.get('/get', (req, res) => {

    Inventory.find({})
        .then((data) => {
            if (data != null) {
                res.json({ data, message: "Inventory pulled successfull", code: "200" })
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

    Inventory.findOne({ "_id": req.params._id })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Inventory " + data._id + " Get")
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

    Inventory.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Inventory " + data._id + " Edited")
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

    Inventory.findOneAndDelete({ "_id": req.params._id })
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

    new Inventory(req.body.data)
        .save()
        .then((data) => {
            console.log(data)
            res.json({ data, message: "Successfully Added!", code: "200" })

        })
        .catch((error) => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        })


});

module.exports = router;
