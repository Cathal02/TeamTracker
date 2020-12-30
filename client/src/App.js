import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AdminDashboard from './views/admin/AdminDashboard';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const App = () => {
	const dispatch = useDispatch();
	const logout = (e) => {
		e.preventDefault();
		axios.post('/api/auth/logout').then((res) => {
			dispatch({ type: 'user/fetch', payload: null });
		});
	};
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<h1>This will be the store front once configured</h1>
					<form onSubmit={logout}>
						<button>Logout</button>
					</form>
				</Route>
				<Route path="/admin">
					<AdminDashboard />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
