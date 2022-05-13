const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({

    exp_number: Number,
    exp_date: Date,
    exp_ref: String,
    exp_name: String,
    exp_desc: String, 
    exp_supplier: String,          
    exp_amount: Number,   
    exp_by: String,

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date

});

ExpenseSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;