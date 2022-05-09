//inventory
const express = require("express");
const router = express.Router();

const Pagination = require('../middleware/paginatedResult');
const Saldeltas = require('../database/models/saldeltas');

router.get('/', (req, res) => {
    Saldeltas.find({})
        .then(saldelta => res.send(saldelta))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Saldeltas(req.body.data))
    .save()
    .then((saldelta) => res.send(saldelta))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Saldeltas.findOne({})
        .then(saldelta => res.send(saldelta))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Saldeltas.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(saldelta => res.send(saldelta))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Saldeltas.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(saldelta => res.send(saldelta))
        .catch(error => console.log(error));
});

module.exports = router;