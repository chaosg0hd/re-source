const mongoose = require('mongoose');

const PettycashSchema = new mongoose.Schema({
    number: Number,
    id: String,
    pet_date: Date,
    pet_desc: String,
    pet_amount: Number,
    pet_by: String,
    
    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

PettycashSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Pettycash = mongoose.model('Pettycash', PettycashSchema);

module.exports = Pettycash;