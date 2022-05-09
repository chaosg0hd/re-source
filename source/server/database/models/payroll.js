const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({

    number: Number,
    payr_date: Date,
    payr_suplier: { type: String, default: 'Company' },

    isValid: Number,
    isArchive: Number,

    content: JSON,

    created_at: Date,
    updated_at: Date
});

PayrollSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Payroll = mongoose.model('Payroll', PayrollSchema);

module.exports = Payroll;