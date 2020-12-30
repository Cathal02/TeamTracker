import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { FETCH_USER } from '../../types';

const Signin = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();

		var formData = new FormData();

		formData.append('email', email);
		formData.append('password', password);
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
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="text"
					name="passwod"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onSubmit={onSubmit}>Submit form</button>
			</form>
		</div>
	);
};

export default Signin;
