const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({

    supp_number: Number,
    //sale_ref: String,
    supp_name: String,
    //sale_desc: String,
    supp_contactNum: String,
    supp_contactPerson: String,

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date
});

SupplierSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Supplier = mongoose.model('Supplier', SupplierSchema);

module.exports = Supplier;