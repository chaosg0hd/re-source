
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const multer = require('multer');
const path = require('path');
const Employee = require('../database/models/employee')

const MAIL_SETTINGS = {
    service: 'gmail',
    auth : {
        user: "ritoriot14@gmail.com",
        pass: "database14"
    },
}
const nodemailer = require('nodemailer');
const e = require("express");
const transporter = nodemailer.createTransport(MAIL_SETTINGS);


const MIME_TYPE_MAP = {
    'image/png': 'png', 
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if(isValid) { error = null; } 
        cb(error, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, 'image-' + Date.now() + '.' + ext);
        
   }
});

const upload = multer({storage: storage});

router.get('/get', (req, res) => {

    Employee.find({})
        .then((data) => {
            if (data != null) {
                res.json({ data, message: "Employees pulled successfull", code: "200" })
            }
            else {
                console.log("Data Does Not Exist")
                res.json({ message: "Get failed", code: "404" })
            }
        })
        .catch(error => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })
})

router.get('/get/:_id', (req, res) => {

    if (req.params._id == undefined) {
        console.trace()

    } else {
        console.log(req.params._id)
    }

    Employee.findOne({ "_id": req.params._id })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Employees " + data._id + " Get")
                res.json({ data, message: "Get successfull", code: "200" })
            }
            else {
                console.log("Data Does Not Exist")
                res.json({ message: "Get failed", code: "404" })
            }
        })
        .catch(error => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })

})

router.patch('/edit', (req, res) => {

    console.log(req.body.data)
    console.log(req.body)
    Employee.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Employees " + data._id + " Edited")
                res.json({ data, message: "Edit successfull", code: "200" })
            }
            else {
                console.log("Data Does Not Exist")
                res.json({ message: "Patch failed", code: "404" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })

})

router.delete('/delete/:_id', (req, res) => {

    if (req.params._id == undefined) {
        console.trace()

    } else {
        console.log(req.params._id)
    }

    Employee.findOneAndDelete({ "_id": req.params._id})
        .then((data) => {
            if (data != null) {
                console.log(data)
                console.log("Delete Successful")
                res.json({ data, message: "Delete successfull", code: "200" })
            }
            else {
                console.log("Data Does Not Exist")
                res.json({ message: "Delete failed", code: "404" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        })
})


router.post('/new', (req, res) => {

    console.log(req.body.data)

    new Employee(req.body.data)
        .save()
        .then((data) => {
            console.log(data)
            console.log(data.emp_id + " Has Employees Logged")
            res.json({ data, message: "Succesfully Employees Logged", code: "200" })

        })
        .catch((error) => {
            console.log(error)
            res.json({ data: "Something Went Wrong", error: error, code: "500" })
        })

});


router.post('/signup', async (req, res) => {

    console.log(req.body.data)
    let empNew = new Employee(req.body.data)
    console.log(empNew)
    empNew.emp_password = await bcrypt.hash(empNew.emp_password, 10)

    Employee.findOne({ "emp_id": empNew.emp_id }, (err, emp) => {
        if (emp) {
            res.json({ message: "Employee already exists", code: "409" })
        }
        else {
            new Employee(empNew)
                .save()
                .then((data) => {
                    console.log(data)
                    console.log("Created New Employee")
                    res.json({ data, message: "Account created successfully", code: "200" })
                })
                .catch((error) => {
                    console.log(error)
                    res.json({ message: "Something Went Wrong", error: error, code: "500" })
                })
        }
    })
})
    //Employee.findOne({ "emp_id": empNew.emp_id }, (err, emp) => {
    //    if (emp) {
    //        res.json({ message: "Employee already exists", code: "409" })
    //    }
    //    else {
    //        //req.body.emp_imgUrl = 'http://localhost:3000/uploads/' + req.file.filename;
    //        //req.body.emp_rate = parseFloat(req.body.emp_rate) 
    //        new Employee(empNew)
    //            .save()
    //            .then((data) => {
    //                console.log(data)
    //                console.log("Created New Employee")
    //                res.json({ data, message: "Account created successfully", code: "200" })
    //            })
    //            .catch((error) => {
    //                console.log(error)
    //                res.json({ message: "Something Went Wrong", error: error, code: "500" })
    //            })


    //    }

    
    // })
    

router.post('/login', (req, res) => {

    console.log(req.body.data)

    let emp_id = req.body.data.emp_id
    let emp_password = req.body.data.emp_password

    Employee.findOne({ "emp_id" : emp_id })
        .then((data) => {
            if (data && bcrypt.compareSync(emp_password, data.emp_password)) {                
                console.log(data)
                console.log("Employee " + data.emp_id + " Logged In")
                const otp = `${Math.floor(1000 + Math.random() * 9000)}`
                if(data.emp_isVerified == false) {
                    
                    transporter.sendMail({
                        from: MAIL_SETTINGS.auth.user,
                        to: data.emp_email ,
                        subject: 'User Verification',
                        html: 'Your OTP Code is: ' + otp
                    })
                }
                res.json({ data, message: "Account logged in successfully", code: "200", otp: otp })
            } else if (data && !bcrypt.compareSync(emp_password, data.emp_password)) {
                console.log("Employee " + emp_id + " Invalid Login")
                res.json({ message: "Invalid Credentials", code: "401"})
            } else {
                console.log("Employee " + emp_id + " Not Exist")
                return res.json({ message: "Account doesn't Exist", code: "404" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })

        
})

router.patch('/otp', (req, res) => {
    console.log('kekw')
    if(req.body.data.emp_isVerified == false){
        Employee.findOneAndUpdate({ "_id": req.body.data._id }, { $set: req.body.data })
        .then((data) => {
            transporter.sendMail({
                from: MAIL_SETTINGS.auth.user,
                to: data.emp_email ,
                subject: 'Your OTP Code is: ' + otp
            })
            console.log(data)
            res.json({code: 200, message: 'Otp created', data : data})
        }).catch((eror) => {
            res.json({code: 500, message: 'otp failed', data: eror})
        })
       
    }
    else {
        res.json({message: 'Already verified'})
    }
          
})

router.patch('/forgot-password', async (req, res) => {
    console.log('kekwsss')
    let newPword = 'erer12345'
    req.body.data.emp_password = await bcrypt.hash(newPword, 10)
    console.log(req.body.data)
        Employee.findOneAndUpdate({ "emp_id": req.body.data.emp_id }, { $set: req.body.data })
        .then((data) => {
            console.log(data)
            transporter.sendMail({
                from: MAIL_SETTINGS.auth.user,
                to: data.emp_email ,
                subject: 'User Password Reset',
                html: 'Your new password is: ' + newPword
            })
            res.json({code: 200, message: 'Email Sent', data : data})
        }).catch((eror) => {
            res.json({code: 500, message: 'No account found', data: eror})
        })
          
})

router.patch('/change-password', async (req, res) => {

    console.log(req.body.data)

    let emp_id = req.body.data.emp_id
    let emp_password = req.body.data.old_pword
    let new_pword = req.body.data.new_pword

    let newPword = await bcrypt.hash(new_pword, 10)
    
    Employee.findOne({ "emp_id" : emp_id })
        .then((data) => {
            if (data && bcrypt.compareSync(emp_password, data.emp_password)) {                
                Employee.updateOne({"emp_id": emp_id}, {$set: {emp_password: newPword}}).then((data)=>{
                    
                    console.log(data)
                    res.json({ data, message: "Password Changed", code: "200"})
                }).catch((error)=>{
                    console.log(error)
                    res.json({ message: "Not saved", code: "401"})
                })
                
            } else if (data && !bcrypt.compareSync(emp_password, data.emp_password)) {
                console.log("Employee " + emp_id + " Invalid Login")
                res.json({ message: "Invalid Credentials", code: "401"})
            } else {
                console.log("Employee " + emp_id + " Not Exist")
                return res.json({ message: "Account doesn't Exist", code: "404" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.json({ message: "Something Went Wrong", error: error, code: "500" })
        })

        
})





//router.put('/:id', (req, res) => {
//    Employees.findOneAndUpdate({"id": req.params}, {$set: req.body.data})
//        .then(employees => res.send(employees))
//        .catch(error => console.log(error))
//})

//router.patch('/:id', (req, res) => {
//    Employees.findOneAndUpdate({"id": req.params}, {$set: req.body.data})
//        .then(employees => res.send(employees))
//        .catch(error => console.log(error))
//})

module.exports = router