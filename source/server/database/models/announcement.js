const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({

    announcement_title: String,
    announcement_content: String,

    announcement_end_date: Date,

    isArchive: Number,
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