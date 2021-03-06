const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({


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

GallerySchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;