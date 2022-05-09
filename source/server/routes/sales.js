//inventory
const express = require("express");
const router = express.Router();

const Sales = require('../database/models/sales');
const Pagination = require('../middleware/paginatedResult');

router.get('/', (req, res) => {
    Sales.find({})
        .then(sales => res.send(sales))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Sales(req.body.data))
    .save()
    .then((sales) => res.send(sales))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Sales.findOne({})
        .then(sales => res.send(sales))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Sales.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(sales => res.send(sales))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Sales.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(sales => res.send(sales))
        .catch(error => console.log(error));
});

module.exports = router;