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
		async function loadUserData() {
			const storedData = await SecureStore.getItemAsync(TOKEN_KEY);
			if (storedData) {
				const userData = JSON.parse(storedData);
				axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

				setAuthState({
					token: userData.token,
					authenticated: true,
					user: userData.user
				});
			}
		}

		loadUserData();
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
			const result = await api.post(`${baseURLApi}/userslogin`, { email, password });

			console.log('AuthLogin result:', result);

			const userData = {
				token: result.data.token,
				user: {
					_id: result.data.user._id,
					email: result.data.user.email,
					username: result.data.user.username
				}
			};

			setAuthState({
				token: result.data.token,
				authenticated: true,
				user: userData.user
			});

			axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

			// Armazenar os dados do usuário e o token juntos
			await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(userData));

			return result;
		} catch (e) {
			return { error: true, msg: (e as any).response.data.msg };
		}
	}


	async function logout() {
		await SecureStore.deleteItemAsync(TOKEN_KEY);

		axios.defaults.headers.common['Authorization'] = '';

		setAuthState({
			token: null,
			authenticated: false,
			user: null
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
