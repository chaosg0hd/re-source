const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({

    emp_number: Number,
    emp_id: String,
    emp_lname: String,
    emp_fname: String,
    emp_mname: String,
    emp_extname: String,    
    emp_start_date: Date,
    emp_birth_date: Date,
    emp_address: String,
    emp_position: String,
    emp_department: String,
    emp_rate: Number,
    emp_rate_type: { type: String, default: 'Monthly' },
    emp_role: { type: String, default: 'Sales Clerk' },

    emp_imgUrl: String,

    emp_password: String,


    isArchive: {
        type: Number, default: 0
    },
    
    created_at: Date,
    updated_at: Date

});

EmployeeSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;