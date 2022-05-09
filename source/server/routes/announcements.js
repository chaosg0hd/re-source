//inventory
const express = require("express");
const router = express.Router();

const Announcement = require('../database/models/announcement');
const Pagination = require('../middleware/paginatedResult');

router.get('/', (req, res) => {
    Announcement.find({})
        .then(announcement => res.send(announcement))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
     // (new Announcement(req.body))
    (new Announcement(req.body.data))
    .save()
    .then((announcement) => res.send(announcement))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Announcement.findOne({})
        .then(announcement => res.send(announcement))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Announcement.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(announcement => res.send(announcement))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Announcement.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(announcement => res.send(announcement))
        .catch(error => console.log(error));
});

module.exports = router;