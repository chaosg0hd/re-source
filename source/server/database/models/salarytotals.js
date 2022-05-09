const mongoose = require('mongoose');

const SalarytotalsSchema = new mongoose.Schema({
    pur_date: Date,
    pur_desc: String,
    pur_by: String,
    pur_amount: Number,
    pur_qty: Number,    
       // _itemId: {
    //     type: mongoose.Types.ObjectId
    // },

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

SalarytotalsSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Salarytotals = mongoose.model('Salarytotals', SalarytotalsSchema);

module.exports = Salarytotals;