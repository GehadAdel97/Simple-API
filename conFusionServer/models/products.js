var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true,
        default: ""
    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});

var Products = mongoose.model('Product', productSchema);

module.exports = Products;