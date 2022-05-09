const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
    
    emp_id: String,       

},{ timestamps: true });

const Time = mongoose.model('Time', TimeSchema);

module.exports = Time;