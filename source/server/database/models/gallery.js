const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const GallerySchema = new mongoose.Schema({
    imageUrl: String,
    imageTitle: String,
    imageDesc: String,
    uploaded: {
        type: Date,
        default: Date.now
    },    
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;