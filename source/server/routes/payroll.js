const express = require("express");
const router = express.Router();

const Payroll = require('../database/models/payroll');
const Pagination = require('../middleware/paginatedResult');

router.get('/', (req, res) => {
    Payroll.find({})
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Payroll(req.body.data))
    .save()
    .then((data) => res.send(data))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Payroll.findOne({})
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Payroll.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Payroll.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(data => res.send(data))
        .catch(error => console.log(error));
});

module.exports = router;