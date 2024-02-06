/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { baseURLApi } from '../utils/api';

interface AuthProps {
	authState?: {
		token: string | null;
		authenticated: boolean | null;
	}
	onRegister?: (email: string, password: string) => Promise<any>;
	onLogin?: (email: string, password: string) => Promise<any>;
	onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
const AuthContext = createContext<AuthProps>({});

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
	const [authState, setAuthState] = useState<{
		token: string | null;
		authenticated: boolean | null;
	}>({
		token: null,
		authenticated: null
	});

	useEffect(() => {
		async function loadToken() {
			const token = await SecureStore.getItemAsync(TOKEN_KEY);
			console.log('stored:', token);

			if (token) {
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

				setAuthState({
					token: token,
					authenticated: true
				});
			}
		}
		loadToken();
	}, []);

	async function register(email: string, password: string) {
		try {
			return await axios.post(`${baseURLApi}/users`, { email, password });
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
				authenticated: true
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
		authState
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}
