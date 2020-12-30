import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import SignIn from '../auth/Signin';
import { FETCH_USER } from '../../types';
import { Link } from 'react-router-dom';

import CreateProduct from '../products/CreateProduct.js';
const AdminDashboard = () => {
	const isLoggedIn = useSelector((state) => state.isUserLoggedIn);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [ src, setSrc ] = useState('');

	useEffect(() => {
		axios
			.get('/api/auth/current_user')
			.then((res) => {
				dispatch({ type: FETCH_USER, payload: res.data });
			})
			.catch((err) => {});
	}, []);

	const makeUserAdmin = (e) => {
		e.preventDefault();
		axios.post('/api/auth/make_user_admin').then((res) => {
			dispatch({ type: FETCH_USER, payload: res.data });
		});
	};

	const getImage = (e) => {
		e.preventDefault();
		var formData = new FormData();
		formData.append('name', 'dot.png');
		// axios
		// 	.post('/api/products/requestImage', formData, {
		// 		headers: {
		// 			accept: 'application/json',
		// 			'Accept-Language': 'en-US,en;q=0.8',
		// 			'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
		// 		}
		// 	})
		// 	.then((res) => {
		// 		setSrc(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};

	const renderView = () => {
		if (!isLoggedIn) {
			return <SignIn />;
		}

		if (!user.isAdmin) {
			return (
				<div>
					<h1>You must be an admin to access the dashboard.</h1>
					<Link to="/">Home</Link>
					<form onSubmit={makeUserAdmin}>
						<button>Make me an admin!</button>
					</form>
				</div>
			);
		}

		return (
			<div>
				<form onSubmit={makeUserAdmin}>
					<button>Remove admin status admin!</button>
				</form>
				<form onSubmit={getImage}>
					<button>Serve image</button>
				</form>
				<h1>Welcome, Admin :0</h1>
				<br />
				<img src="images/lospolice.jpg.df0727aad53f95864456fbe8e3da0213jpg" />

				<CreateProduct />
			</div>
		);
	};

	return (
		<div>
			<h1>Admin Dashboard</h1>;
			{renderView()}
		</div>
	);
};

export default AdminDashboard;
