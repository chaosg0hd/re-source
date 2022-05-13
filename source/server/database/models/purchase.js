const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({

    purc_number: Number,
    purc_date: Date,
    purc_ref: String,
    purc_name: String,
    purc_desc: String,
    purc_supplier: String,
    purc_amount: Number,
    purc_by: String,

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date

});

PurchaseSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;