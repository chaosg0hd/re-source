const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({

    inv_id: String,
    inv_name: String,
    inv_category: String,
    inv_brand: String,
    inv_description: String,
    inv_quantity: Number,
    inv_price: Number,
    inv_imageUrl: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png' },
    inv_supplier : String,
    inv_min_amount: Number,

    isArchive: {
        type: Number, default: 0
    },

    created_at: Date,
    updated_at: Date

});

InventorySchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;

