//inventory
const express = require("express");
const router = express.Router();

const Salarytotals = require('../database/models/salarytotals');
const Pagination = require('../middleware/paginatedResult');

router.get('/', (req, res) => {
    Salarytotals.find({})
        .then(salarytotal => res.send(salarytotal))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Salarytotals(req.body.data))
    .save()
    .then((salarytotal) => res.send(salarytotal))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Salarytotals.findOne({})
        .then(salarytotal => res.send(salarytotal))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Salarytotals.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(salarytotal => res.send(salarytotal))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Salarytotals.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(salarytotal => res.send(salarytotal))
        .catch(error => console.log(error));
});

module.exports = router;