import axios from 'axios';
import { useState } from 'react';
export const useFetch = (url) => {
	const [ response, setResponse ] = useState({ data: null, loading: true, error: null });

	axios
		.get(url)
		.then((res) => {
			setResponse({ data: res.data, loading: false });
		})
		.catch((err) => {
			setResponse({ ...response, error: err });
		});

	return response;
};
