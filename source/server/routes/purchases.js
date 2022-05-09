//inventory
const express = require("express");
const router = express.Router();

const Purchases = require('../database/models/purchases');
const Pagination = require('../middleware/paginatedResult');

router.get('/', (req, res) => {
    Purchases.find({})
        .then(purchases => res.send(purchases))
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {  
    (new Purchases(req.body.data))
    .save()
    .then((purchases) => res.send(purchases))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Purchases.findOne({})
        .then(purchases => res.send(purchases))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    Purchases.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(purchases => res.send(purchases))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Purchases.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(purchases => res.send(purchases))
        .catch(error => console.log(error));
});

module.exports = router;