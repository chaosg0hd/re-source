//inventory
const express = require("express");
const router = express.Router();

const Draws = require('../database/models/draws');
const Pagination = require('../middleware/paginatedResult');

router.get('/', (req, res) => {
    Draws.find({})
        .then(draws => res.send(draws))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Draws(req.body.data))
    .save()
    .then((draws) => res.send(draws))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Draws.findOne({})
        .then(draws => res.send(draws))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Draws.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(draws => res.send(draws))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Draws.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(draws => res.send(draws))
        .catch(error => console.log(error));
});

module.exports = router;