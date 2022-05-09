const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    
    /*_id: id,*/

    number: Number,
    
    emp_id: String,

    attendance_date: Date,    
    attendance_seconds: Number,
    
    status: String,
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