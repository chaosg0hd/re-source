const mongoose = require('mongoose');

const Petty_CashSchema = new mongoose.Schema({

    pet_number: Number,
    pet_date: Date,
    pet_ref: String,
    pet_name: String,
    pet_desc: String,
    pet_supplier: String,
    pet_amount: Number,
    pet_by: String,

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date
});

Petty_CashSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Petty_Cash = mongoose.model('Petty_Cash', Petty_CashSchema);

module.exports = Petty_Cash;