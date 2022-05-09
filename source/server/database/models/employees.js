const mongoose = require('mongoose');

const EmployeesSchema = new mongoose.Schema({

    number: Number,
    emp_id: String,
    lname: String,
    fname: String,
    mname: String,
    extname: String,   
    start_Date: Date,
    birth_Date: Date,
    address: String,
    position: String,
    department: String,
    rate: String,
    rate_Type: { type: String, default: 'monthly' },
    role: { type: String, default: 'developer' },
    password: String,
    isArchive: Number,
    imgUrl: String,
    created_at: Date,
    updated_at: Date

});

EmployeesSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Employees = mongoose.model('Employees', EmployeesSchema);

module.exports = Employees;