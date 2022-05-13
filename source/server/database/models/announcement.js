const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({

    anno_title: String,
    anno_content: String,
    anno_start_date: Date,
    anno_end_date: Date,

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date
});

AnnouncementSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

module.exports = Announcement;