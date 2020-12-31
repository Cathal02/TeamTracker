import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { FETCH_USER } from '../../types';
import { useForm } from '../../hooks/useForm.js';

const Signin = () => {
	const [ values, handleChange ] = useForm({ email: '', password: '' });
	const [ error, setError ] = useState("'");
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();

		var formData = new FormData();

		formData.append('email', values.email);
		formData.append('password', values.password);
		axios
			.post('/api/auth/login', formData, {
				headers: {
					accept: 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
				}
			})
			.then((response) => {
				//handle success
				if (response.status === 200) {
					dispatch({ type: FETCH_USER, payload: response.data });
				} else {
					setError('Error occured.');
				}
			})
			.catch((error) => {
				//handle error
				setError(error.response.data.message);
			});
	};
	return (
		<div>
			<h1>Sign in</h1>
			{error}
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="email"
					placeholder="email"
					autoFocus
					value={values.email}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="password"
					placeholder="password"
					value={values.password}
					onChange={handleChange}
				/>
				<button onSubmit={onSubmit}>Submit form</button>
			</form>
		</div>
	);
};

export default Signin;
