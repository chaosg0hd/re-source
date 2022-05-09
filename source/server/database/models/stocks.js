const mongoose = require('mongoose');

const StocksSchema = new mongoose.Schema({
    stock_name: String,
    stock_unitPrice: Number,
    stock_quantity: Number,
    stock_desc: String,
       // _itemId: {
    //     type: mongoose.Types.ObjectId
    // },

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

StocksSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Stocks = mongoose.model('Stocks', StocksSchema);

module.exports = Stocks;