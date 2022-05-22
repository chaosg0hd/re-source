const express = require("express");
const router = express.Router();
// const {auth} = require('two-step-auth')
const MAIL_SETTINGS = {
    service: 'gmail',
    auth : {
        user: "ritoriot14@gmail.com",
        pass: "database14"
    },
}
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

require('dotenv').config()

let AUTH_TOKEN = '3ecb82c0b09584a2'
let AUTH_TOKEN2 = '20116b324a671884'
const client = require('twilio')('AC67ae21bfa100f7ccf74f7cb90954ee0e', AUTH_TOKEN + AUTH_TOKEN2)

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

router.post('/get', (req, res) => {
    console.log(req.body.contactNum)
    let data = Math.floor(100000 + Math.random() * 900000)
    client.messages.create({
        body: 'This is your OTP code ' + data,
        to: req.body.contactNum,
        from: '+18453828343'
    }).then(message => 
        console.log(message))
        //res.json({code: 200, message: 'OTP Sent', data: data}))
    .catch(error => console.log(error))
        //res.json({code: 500, message: 'error'}))
    //+639171936893

    res.json({message: 'message sent', data: data})
})

    router.post('/email', async (req, res) => {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
       try {
        let info = await transporter.sendMail({
            from: MAIL_SETTINGS.auth.user,
            to: "kawaiiralph14@gmail.com" ,
            subject: 'Your OTP Code is: ' + otp
        })
        return info
       } catch (err) {
        return false
       }
    })

    try {
        
        let email = 'kawaiiralph14@gmail.com'
     
    }catch (err) {

    }
module.exports = router;