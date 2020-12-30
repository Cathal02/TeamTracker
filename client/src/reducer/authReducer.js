import { FETCH_USER } from '../types';
import { USER_LOGGED_IN } from '../types';

export default function authReducer(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			var isUserLoggedIn = !(
				action.payload === null ||
				action.payload === undefined ||
				Object.keys(action.payload).length == 0
			);
			return {
				...state,
				user: action.payload,
				isUserLoggedIn: isUserLoggedIn
			};
		default:
			return state;
	}
}
