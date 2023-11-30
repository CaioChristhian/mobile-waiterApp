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


interface CartProps {
	cartItems: CartItem[];
	onAdd: (product: Product) => void;
	onDecrement: (product: Product) => void;
}

export function Cart({ cartItems, onAdd, onDecrement }: CartProps){
	const [ isModalVisible, setIsModalVisible] = useState(false);

	const total = cartItems.reduce((acc, cartItem) => {
		return acc + cartItem.quantity * cartItem.product.price;
	}, 0);

	function handleConfirmOrder() {
		setIsModalVisible(true);
	}

	return (
		<>
			<OrderConfirmedModal onOk={() => setIsModalVisible(false)} visible={isModalVisible} />

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
										uri: 'https://i.pinimg.com/736x/a9/15/05/a91505ce5e4f27e5a80fd3dc2bb287f4.jpg' /* htt://localhost:3001/uploads/${cartItem.product.imagePath} */
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

				<Button disabled={cartItems.length === 0} onPress={handleConfirmOrder}>
					Confirmar Pedido
				</Button>
			</S.Summary>
		</>
	);
}
