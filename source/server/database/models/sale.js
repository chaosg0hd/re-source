const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({

    sale_number: Number,
    sale_date: Date,
    sale_ref: String,
    sale_name: String,
    sale_desc: String,
    sale_supplier: String,
    sale_amount: Number,
    sale_by: String,

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date
});

SaleSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Sale = mongoose.model('Sale', SaleSchema);

module.exports = Sale;