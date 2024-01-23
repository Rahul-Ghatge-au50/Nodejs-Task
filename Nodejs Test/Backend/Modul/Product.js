const mongoose = require('mongoose');
const Category = require('../Modul/Category');

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required:true
    },
    price: {
        type: Number
    },
    desc: {
        type: String
    },
    slug: {
        type: String,
        unique: true
    }
})

// Define a pre-save middleware to generate the slug
// productSchema.pre('save', function (next) {
//     this.slug = slugify(this.name, {
//         lower: true,
//         remove: /[*+~.()'"!:@]/g,  // Remove specific characters
//     });
//     next();
// });

module.exports = new mongoose.model('products', productSchema);