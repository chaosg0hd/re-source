const mongoose = require('mongoose');




//export interface Inventories {
//    number: number;
//    id: string;
//    _id: string;

//    name: string;
//    description: string;
//    quantity: number;
//    price: number;
//    imageUrl: string

//    isArchive: number;
//    created_at: Date;
//    updated_at: Date;
//}


const InventorySchema = new mongoose.Schema({

    number: Number,

    inv_id: String,
    name: String,
    category: String,
    description: String,
    quantity: Number,
    price: Number,    
    imageUrl: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png' },
    supplier : String,
    min_amount: Number,

    isArchive: Number,
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

/*
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    brand: String, 
    description: String, 
    quantity:Number,
    category:String,
    price:Number,
    image:String,
    username:String,    
    supplier: String,
    created_at: Date,
    updated_at: Date
});
productSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

module.exports = mongoose.model('products',productSchema);

*/