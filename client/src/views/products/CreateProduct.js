import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
	const [ productName, setProductName ] = useState('');
	const [ file, setFile ] = useState('');
	const [ error, setError ] = useState('');
	const [ price, setPrice ] = useState(' ');
	const onSubmit = (e) => {
		e.preventDefault();

		if (file == null) {
			setError('Image has not been uploaded');
		}

		var formData = new FormData();

		formData.append('productName', productName);
		formData.append('file', file);
		formData.append('price', price);
		axios
			.post('/api/products/createProduct', formData, {
				headers: {
					accept: 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
				}
			})
			.then((response) => {
				//handle success
				if (response.status === 200) {
					setError('Image uploaded succesfully');
				} else {
					setError('There as an error in trying to upload your image! Please try again');
				}
			})
			.catch((error) => {
				//handle error
				setError('Error occured');
			});
	};

	const addFile = (file) => {
		if (file == null) return;

		setFile(file);
	};

	return (
		<div>
			<p>{error}</p>
			<h1>Create a product.</h1>

			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="Product name"
					autoFocus
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
				/>
				<input
					placeholder="Price"
					type="number"
					name="price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>

				<input
					type="file"
					name="sampleFile"
					accept="image/png, image/jpeg"
					onChange={(e) => addFile(e.target.files[0])}
				/>
				<button onSubmit={onSubmit}>Submit form</button>
			</form>
		</div>
	);
};

// var formData = new FormData();
// var file = this.fileInput.current.files[0];
// formData.append('file', file, file.name);

export default CreateProduct;
