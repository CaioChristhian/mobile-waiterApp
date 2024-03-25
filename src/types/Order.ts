import { Status } from '../utils/statusOrders';

export interface Order {
	_id: string;
	table: string;
	status: Status;
	createdAt?: Date;
	products: {
		product: {
			_id: string;
			name: string;
			description: string;
			imagePath: string;
			price: number;
			ingredients: {
					name: string;
					icon: string;
					_id: string;
			}[];
			category: string;
			__v: number;
		};
		quantity: number;
		_id: string;
	}[];
	user: {
		_id: string;
		email: string;
		username: string;
	}
}
