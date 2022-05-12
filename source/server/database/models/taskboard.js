const mongoose = require('mongoose');

//const TaskEmpSchema = new mongoose.Schema({

//    emp_id: String,

//})

const TaskBoardSchema = new mongoose.Schema({


    task_id: String,
    
    number: String,
    project: String,
    progress: Number,
    value: Number,
    name: String,
    content: String,
    end_date: Date,
    master: String,
    slave: { type: Array, default: void 0 },
    
    taskBoard_employees: { type: Array, default: void 0 },

    task_by: String,

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