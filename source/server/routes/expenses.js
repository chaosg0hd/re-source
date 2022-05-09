//inventory
const express = require("express");
const router = express.Router();

const Expenses = require('../database/models/expenses');
const Pagination = require('../middleware/paginatedResult');

router.get('/', (req, res) => {
    Expenses.find({})
        .then(expenses => res.send(expenses))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Expenses(req.body.data))
    .save()
    .then((expenses) => res.send(expenses))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Expenses.findOne({})
        .then(expenses => res.send(expenses))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Expenses.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(expenses => res.send(expenses))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Expenses.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(expenses => res.send(expenses))
        .catch(error => console.log(error));
});

module.exports = router;