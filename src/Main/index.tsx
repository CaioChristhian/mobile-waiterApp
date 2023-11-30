import React, { useState } from 'react';

import { Header } from '../components/Header';

import * as S from './styles';
import { Categories } from '../components/Categories';
import { Button } from '../components/Button';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { CartItem } from '../types/CartItem';
import { Cart } from '../components/Cart';
import { Product } from '../types/Product';

export function Main(){
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	function handleSaveTable(table: string) {
		setSelectedTable(table);
		setIsTableModalVisible(false);
	}

	function handleCancelOrder() {
		setSelectedTable('');
		setCartItems([]);
	}

	function handleAddToCart(product: Product) {
		if (!selectedTable) {
			setIsTableModalVisible(true);
		}

		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(cartItems => cartItems.product._id === product._id);

			if (itemIndex < 0) {
				return prevState.concat({
					quantity: 1,
					product,
				});
			}

			const newCartItems = [...prevState];
			const item = newCartItems[itemIndex];
			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity +1
			};

			return newCartItems;
		});
	}

	function handleDecrementCartItem(product: Product) {
		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(cartItems => cartItems.product._id === product._id);

			const item = prevState[itemIndex];
			const newCartItems = [...prevState];

			if (item.quantity === 1) {
				newCartItems.splice(itemIndex, 1);

				return newCartItems;
			}

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity - 1
			};

			return newCartItems;
		});
	}

	return (
		<>
			<S.Container>
				<Header
					selectedTable={selectedTable}
					onCancelOrder={handleCancelOrder}
				/>

				<S.CategoriesContainer>
					<Categories />
				</S.CategoriesContainer>

				<S.MenuContainer>
					<Menu onAddToCart={handleAddToCart} />
				</S.MenuContainer>

			</S.Container>
			<S.Footer>
				<S.FooterContainer>
					{!selectedTable &&
					<Button onPress={() => setIsTableModalVisible(true)}>
					Novo Pedido
					</Button>
					}

					{selectedTable && (
						<Cart onAdd={handleAddToCart} cartItems={cartItems} onDecrement={handleDecrementCartItem} />
					)}
				</S.FooterContainer>
			</S.Footer>

			<TableModal
				onSave={handleSaveTable}
				onClose={() => setIsTableModalVisible(false)}
				visible={isTableModalVisible}
			/>
		</>

	);
}
