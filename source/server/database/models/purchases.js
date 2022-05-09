const mongoose = require('mongoose');

const PurchasesSchema = new mongoose.Schema({
    number: Number,
    id: String,
    
    purc_date: Date,
    purc_supplier: String,
    purc_price: Number, 
    purc_quantity: Number,
    purc_desc: String,
    purc_by: String,
       
    purc_quantity: Number,
       // _itemId: {
    //     type: mongoose.Types.ObjectId
    // },

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

PurchasesSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Purchases = mongoose.model('Purchases', PurchasesSchema);

module.exports = Purchases;