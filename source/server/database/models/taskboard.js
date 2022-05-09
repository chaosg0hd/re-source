const mongoose = require('mongoose');

const TaskBoardSchema = new mongoose.Schema({

    taskBoard_number: String,
    taskBoard_project: String,
    taskBoard_name: String,
    taskBoard_content: String,
    taskBoard_end_date: Date, //give this default 0
    taskBoard_master: String, 
    taskBoard_slave: String,
    taskBoard_employees: JSON,
    imageUrl: String,
    uploaded_by: String,

    isArchive: {type: Number, default: 0},
    created_at: Date,
    updated_at: Date
});

TaskBoardSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const TaskBoard = mongoose.model('TaskBoard', TaskBoardSchema);

module.exports = TaskBoard;