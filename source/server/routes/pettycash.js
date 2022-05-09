const express = require("express");
const router = express.Router();

const Pettycash = require('../database/models/pettycash');
const Pagination = require('../middleware/paginatedResult');


// function paginatedResults(model) {
//     return async (req, res, next) => {
//       const page = parseInt(req.query.page)
//       const limit = parseInt(req.query.limit)
  
//       const startIndex = (page - 1) * limit
//       const endIndex = page * limit
  
//       const results = {}
//         console.log(page, limit);
//       if (endIndex < await model.countDocuments().exec()) {
//         results.next = {
//           page: page + 1,
//           limit: limit
//         }
//       }
      
//       if (startIndex > 0) {
//         results.previous = {
//           page: page - 1,
//           limit: limit
//         }
//       }
//       try {
//         results.results = await model.find().limit(limit).skip(startIndex).exec()
//         res.paginatedResults = results
//         next()
//       } catch (e) {
//         res.status(500).json({ message: e.message })
//       }
//     }
//   }

router.get('/', Pagination(Pettycash), (req, res) => {
    // Pettycash.find({})
    //     .then(pettycash => res.send(pettycash))
    //     .catch(error => console.log(error));
    res.json(res.paginatedResults)
        
});

router.post('/', (req, res) => {  
    console.log(req.body.data);
    (new Pettycash(req.body.data))
    .save()
    .then((pettycash) => res.send(pettycash))
    .catch((error) => console.log(error));
    
});

router.get('/:_id', (req, res) => {
    Pettycash.findOne({})
        .then(pettycash => res.send(pettycash))
        .catch(error => console.log(error));
});

router.put('/:_id', (req, res) => {
    // console.log(req.params);
    // console.log(req.body);
    Pettycash.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(pettycash=> res.send(pettycash))
        .catch(error => console.log(error));
});

router.patch('/:_id', (req, res) => {
    Pettycash.findOneAndUpdate({"_id": req.params}, {$set: req.body.data})
        .then(pettycash => res.send(pettycash))
        .catch(error => console.log(error));
});

module.exports = router;