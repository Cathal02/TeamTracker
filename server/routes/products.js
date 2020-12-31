const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const path = require('path');
router.post('/createProduct', (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	const fileName = req.files.file.name.replace(' ', '_');
	req.files.file.mv('./images/' + fileName, (err) => {
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
		});
	});
});

router.get('/getImage', (req, res) => {
	if (req.query.image == null) return res.status(404).send('Image not found.');
	const fileName = req.query.image.replace(' ', '_');

	return res.sendFile(path.join(__dirname, '../images/' + fileName));
});

module.exports = router;
