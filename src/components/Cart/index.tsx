import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { CartItem } from '../../types/CartItem';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';

import * as S from './styles';
import { Button } from '../Button';
import { Product } from '../../types/Product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { api, baseURLApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';


interface CartProps {
	cartItems: CartItem[];
	onAdd: (product: Product) => void;
	onDecrement: (product: Product) => void;
	onConfirmOrder: () => void;
	selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps){
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { authState } = useAuth();


	const total = cartItems.reduce((acc, cartItem) => {
		return acc + cartItem.quantity * cartItem.product.price;
	}, 0);

	async function handleConfirmOrder() {
		setIsLoading(true);

		const payload = {
			table: selectedTable,
			products: cartItems.map((cartItem) => ({
				product: cartItem.product._id,
				quantity: cartItem.quantity
			})),
			user: authState?.user?._id
		};

		api.post('/orders', payload);

		setIsLoading(false);
		setIsModalVisible(true);
	}

	function handleOk() {
		onConfirmOrder();
		setIsModalVisible(false);
	}

	return (
		<>
			<OrderConfirmedModal onOk={handleOk} visible={isModalVisible} />

			{cartItems.length > 0 && (
				<FlatList
					style={{ marginBottom: 20, maxHeight: 150 }}
					data={cartItems}
					keyExtractor={cartItem => cartItem.product._id}
					showsVerticalScrollIndicator={false}
					renderItem={({ item: cartItem}) => (
						<S.Item>
							<S.ProductContainer>
								<S.Image
									source={{
										uri: `${baseURLApi}/uploads/${cartItem.product.imagePath}` /* http://localhost:3001/uploads/${cartItem.product.imagePath} */
									}}
								/>

								<S.QuantityContainer>
									<Text size={14} color="#666">
										{cartItem.quantity}x
									</Text>
								</S.QuantityContainer>

								<S.ProductDetails>
									<Text size={14} weight="600">{cartItem.product.name}</Text>
									<Text size={14} color="#666" style={{ marginTop: 4 }}>{formatCurrency(cartItem.product.price)}</Text>
								</S.ProductDetails>
							</S.ProductContainer>

							<S.Actions>
								<TouchableOpacity onPress={() => onAdd(cartItem.product)} style={{ marginRight: 24 }}>
									<PlusCircle />
								</TouchableOpacity>

								<TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
									<MinusCircle />
								</TouchableOpacity>
							</S.Actions>
						</S.Item>
					)}
				/>
			)}

			<S.Summary>
				<S.TotalContainer>
					{cartItems.length > 0 ? (
						<>
							<Text color="#666">Total</Text>
							<Text size={20} weight="600">{formatCurrency(total)}</Text>
						</>
					) : (
						<Text color="#999">Seu carrinho está vazio</Text>
					)}
				</S.TotalContainer>

				<Button loading={isLoading} disabled={cartItems.length === 0} onPress={handleConfirmOrder}>
					Confirmar Pedido
				</Button>
			</S.Summary>
		</>
	);
}
