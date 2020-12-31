import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import SignIn from '../auth/Signin';
import { FETCH_USER } from '../../types';
import { Link } from 'react-router-dom';
import { useFetchUser } from '../../hooks/useFetchUser';
import CreateProduct from '../products/CreateProduct.js';
import { getImage } from './getImage';

const AdminDashboard = () => {
	const isLoggedIn = useSelector((state) => state.isUserLoggedIn);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const makeUserAdmin = (e) => {
		e.preventDefault();
		axios.post('/api/auth/make_user_admin').then((res) => {
			dispatch({ type: FETCH_USER, payload: res.data });
		});
	};

	useFetchUser();

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
				<form>
					<button>Serve image</button>
				</form>
				<h1>Welcome, Admin :0</h1>
				<br />
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
