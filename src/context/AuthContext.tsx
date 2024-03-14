/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { api, baseURLApi } from '../utils/api';

interface UserProps {
	_id: string;
	username?: string;
	email?: string;
	password?: string;
}

interface AuthProps {
	authState?: {
		token: string | null;
		authenticated: boolean | null;
		user: UserProps | null;
	}
	onRegister?: (email: string, username: string, password: string, role?: string | 'user' ) => Promise<any>;
	onLogin?: (email: string, password: string) => Promise<any>;
	onLogout?: () => Promise<any>;
	user?: null;
	setUser?: () => void;
	updateUser: () => void // adicione esta linha
}

const TOKEN_KEY = 'my-jwt';
const AuthContext = createContext<AuthProps>({
	user: null,
	setUser: () => {},
	updateUser: () => {}, // adicione esta linha
});

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
	const [authState, setAuthState] = useState<{
		token: string | null;
		authenticated: boolean | null;
		user?: UserProps | null
	}>({
		token: null,
		authenticated: null,
		user: null
	});

	const updateUser = (updatedUser: UserProps) => {
		setAuthState(prevState => ({
			...prevState,
			user: updatedUser
		}));
	};

	useEffect(() => {
		async function loadToken() {
			const token = await SecureStore.getItemAsync(TOKEN_KEY);
			console.log('stored:', token);

			if (token) {
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

				try {
					const response = await api.get(`${baseURLApi}/users`);
					const user = response.data;



					console.log(user);
				} catch (error) {
					console.log('Erro ao obter dados do usuário');
				}

				setAuthState({
					token: token,
					authenticated: true,
				});
			}
		}
		loadToken();
	}, []);

	async function register(email: string, username: string, password: string) {
		try {
			const result = await axios.post(`${baseURLApi}/users`, { email, username, password });

			return result;
		} catch (e) {
			return {  error: true, msg: (e as any).response.data.msg };
		}
	}

	async function login(email: string, password: string) {
		try {
			const result = await axios.post(`${baseURLApi}/userslogin`, { email, password });

			console.log('AuthLogin result:', result);

			setAuthState({
				token: result.data.token,
				authenticated: true,
				user: { _id: result.data.user._id, email: result.data.user.email, username: result.data.user.username }
			});

			axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

			await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

			return result;
		} catch (e) {
			return {  error: true, msg: (e as any).response.data.msg };
		}
	}


	async function logout() {
		await SecureStore.deleteItemAsync(TOKEN_KEY);

		axios.defaults.headers.common['Authorization'] = '';

		setAuthState({
			token: null,
			authenticated: false
		});
	}

	const value = {
		onRegister: register,
		onLogin: login,
		onLogout: logout,
		authState,
		updateUser
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}
