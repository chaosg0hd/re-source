const mongoose = require('mongoose');

const Task_BoardSchema = new mongoose.Schema({

    task_id: String,    
    task_number: String,
    task_project: String,
    task_progress: Number,
    task_type: String,
    task_value: Number,
    task_name: String,
    task_content: String,
    task_end_date: Date,
    task_start_date: Date,
    task_emp_id: { type: Array, default: void 0 },   
    task_by: String,

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date
});

Task_BoardSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Task_Board = mongoose.model('Task_Board', Task_BoardSchema);

module.exports = Task_Board;