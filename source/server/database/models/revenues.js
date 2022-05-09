const mongoose = require('mongoose');

const RevenuesSchema = new mongoose.Schema({
    number: Number,
    id: String,
    rev_date: Date,
    rev_supplier: String,
    rev_desc: String,
    rev_by: String,
    rev_amount: Number, 

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

RevenuesSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Revenues = mongoose.model('Revenues', RevenuesSchema);

module.exports = Revenues;
