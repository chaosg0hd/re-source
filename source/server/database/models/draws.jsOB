const mongoose = require('mongoose');

const DrawsSchema = new mongoose.Schema({
    draw_date: Date,
    draw_desc: String,
    draw_by: String,
    draw_amount: Number,    
       // _itemId: {
    //     type: mongoose.Types.ObjectId
    // },

    isArchive: Number,
    created_at: Date,
    updated_at: Date
});

DrawsSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Draws = mongoose.model('Draws', DrawsSchema);

module.exports = Draws;