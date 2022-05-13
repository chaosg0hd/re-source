const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({


    gal_url: String,
    gal_name: String,
    gal_description: String,

    gal_uploaded_date: {
        type: Date,
        default: Date.now
    },

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date


});

FileSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const File = mongoose.model('File', FileSchema);

module.exports = File;