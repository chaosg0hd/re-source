const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({

    rev_number: Number,
    rev_date: Date,
    rev_ref: String,
    rev_name: String,
    rev_desc: String,
    rev_supplier: String,
    rev_amount: Number,
    rev_by: String,

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date
});

RevenueSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Revenue = mongoose.model('Revenue', RevenueSchema);

module.exports = Revenue;
