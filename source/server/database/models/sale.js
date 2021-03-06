const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({

    sale_number: Number,
    sale_date: Date,
    //sale_ref: String,
    sale_itemName: String,
    //sale_desc: String,
    sale_supplier: String,
    sale_price: Number,
    sale_quantity: Number,
    //sale_by: String,
    sale_itemId: String,
    isArchive: {
        type: Number, default: 0
    },
    sale_empName: String,

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