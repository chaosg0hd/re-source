const express = require("express");
const router = express.Router();
const client = require('twilio')('AC67ae21bfa100f7ccf74f7cb90954ee0e','d42e6f7a9d4ca55cb1788991e06bd4b9')

router.get('/get', (req, res) => {
    
    let data = Math.floor(100000 + Math.random() * 900000)
    client.messages.create({
        body: 'This is your OTP code ' + data,
        to: '+63 915 600 8276',
        from: '+18453828343'
    }).then(message => 
        console.log(message))
        //res.json({code: 200, message: 'OTP Sent', data: data}))
    .catch(error => console.log(error))
        //res.json({code: 500, message: 'error'}))

    res.json({message: 'message sent', data: data})
})
module.exports = router;