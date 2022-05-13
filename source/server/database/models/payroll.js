const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({

    pay_number: Number,
    pay_date: Date,
    pay_ref: String,
    pay_name: String,
    pay_desc: String,
    pay_supplier: String,
    pay_amount: Number,
    pay_by: String,

    isArchive: {
        type: Number, default: 0
    },

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