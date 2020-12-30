const mongoose = require('mongoose');

const Product = new mongoose.Schema({
	name: {
		type: String,
		default: null
	},
	price: {
		type: String,
		default: null
	},
	productImage: {
		type: String,
		default: 'default_team_logo.png'
	}
});

module.exports = Club = mongoose.model('Products', Product);
