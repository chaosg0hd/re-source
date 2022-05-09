const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    number: Number,
    id: String,
    sales_date: Date,
    sales_supplier: String,
    sales_price: Number,
    sales_quantity: Number,
    sales_desc: String,
    sales_by: String,
    sales_amount: Number,
    
    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

SalesSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Sales = mongoose.model('Sales', SalesSchema);

module.exports = Sales;