import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_USER } from '../types';
import axios from 'axios';

export const useFetchUser = () => {
	var dispatch = useDispatch();
	useEffect(() => {
		axios.get('/api/auth/current_user').then((res) => {
			dispatch({ type: FETCH_USER, payload: res.data });
		});
	}, []);
};
