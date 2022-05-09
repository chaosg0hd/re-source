const mongoose = require('mongoose');

const SaldeltasSchema = new mongoose.Schema({
    del_name: String,
    del_amount: Number,
    del_date: Date,
    del_desc: String,
       // _itemId: {
    //     type: mongoose.Types.ObjectId
    // },

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

SaldeltasSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Saldeltas = mongoose.model('Saldeltas', SaldeltasSchema);

module.exports = Saldeltas;