import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://192.168.0.31:3001',
});

export const baseURLApi = 'http://192.168.0.31:3001';
