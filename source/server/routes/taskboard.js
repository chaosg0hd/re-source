const express = require("express");
const multer = require('multer');
const router = express.Router();
const path = require('path');

const TaskBoard = require('../database/models/taskboard');
const Pagination = require('../middleware/paginatedResult');

const MIME_TYPE_MAP = {
    'image/png': 'png', 
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if(isValid) { error = null; } 
        cb(error, path.join(__dirname, '../uploads/taskboard'));
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, 'image-' + Date.now() + '.' + ext);
        
   }
});

const upload = multer({storage: storage});

router.post("/", upload.single('file'), (req, res, next) => {
    console.log(req.body);
    if(!req.file) {
        return res.status(500).send({ message: 'Upload Failed'});
    } else {
        req.body.imageUrl = 'http://localhost:3000/uploads/taskboard/' + req.file.filename;
        req.body.isArchive = 0;
        (new TaskBoard(req.body))
        .save()
        .then((taskboard) => res.send(taskboard))
        .catch((error) => (error));
    }
// router.post('/', multer({storage: storage}).single("image"), (req, res) => {  
//     (new Inventory(req.body.data))
//     .save()
//     .then((inventory) => res.send(inventory))
//     .catch((error) => console.log(error));
    
// });

});


router.get('/', (req, res) => {
    console.log(res.body)
    TaskBoard.find({})
        .then(taskboard => res.send(taskboard))
        .catch(error => console.log(error));
});

router.get('/:_id', (req, res) => {
    TaskBoard.findOne({})
        .then(taskboard => res.send(taskboard))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    TaskBoard.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(taskboard => res.send(taskboard))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    TaskBoard.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(taskboard => res.send(taskboard))
        .catch(error => console.log(error));
});

module.exports = router;
