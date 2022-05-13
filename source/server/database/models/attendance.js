const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({

    atten_number: Number,    
    atten_emp_id: String,
    atten_emp_name: String,
    atten_date: Date,    
    atten_seconds: Number,    
    atten_status: String,

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date
});

AttendanceSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;