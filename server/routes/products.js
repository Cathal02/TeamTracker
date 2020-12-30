const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const path = require('path');
router.post('/createProduct', (req, res) => {
	console.log('hit');
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	req.files.file.mv('../public/images/' + req.files.file.name, (err) => {
		if (err) {
			return res.status(500).send(err);
		}

		const product = {
			productImage: req.files.file.name,
			name: req.body.productName,
			price: req.body.price
		};
		Product.create(product, (createErr, product) => {
			if (createErr) {
				return res.send(err);
			}

			console.log(product);
		});
	});
});

module.exports = router;
