import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { Header } from '../../components/Header';
import { Categories } from '../../components/Categories';
import { Button } from '../../components/Button';
import { Menu } from '../../components/Menu';
import { TableModal } from '../../components/TableModal';
import { Cart } from '../../components/Cart';
import { Empty } from '../../components/Icons/Empty';
import { Text } from '../../components/Text';

import { Category } from '../../types/Category';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';

import { api } from '../../utils/api';

import * as S from './styles';

export function Main(){
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedTable, setSelectedTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);

	useEffect(() => {
		Promise.all([
			api.get('/categories'),
			api.get('/products'),
		]).then(([categoriesResponse, productsResponse]) => {
			const categories = categoriesResponse.data;
			const products = productsResponse.data;

			setCategories(categories);
			setProducts(products);
			setIsLoading(false);
		});

	}, []);

	async function handleSelectCategory(categoryId: string) {
		const route = !categoryId
			? '/products'
			: `/categories/${categoryId}/products`;

		setIsLoadingProducts(true);

		const { data } = await api.get(route);

		setProducts(data);
		setIsLoadingProducts(false);
	}

	function handleSaveTable(table: string) {
		setSelectedTable(table);
		setIsTableModalVisible(false);
	}

	function handleResetOrder() {
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
					onCancelOrder={handleResetOrder}
				/>

				{isLoading && (
					<S.CenteredContainer>
						<ActivityIndicator color="#D73035" size="large" />
					</S.CenteredContainer>
				)}

				{!isLoading && (
					<>
						<S.CategoriesContainer>
							<Categories onSelectCategory={handleSelectCategory} categories={categories} />
						</S.CategoriesContainer>

						{isLoadingProducts ? (
							<S.CenteredContainer>
								<ActivityIndicator color="#D73035" size="large" />
							</S.CenteredContainer>
						) : (
							<>
								{products.length > 0 ? (
									<S.MenuContainer>
										<Menu
											onAddToCart={handleAddToCart}
											products={products}
										/>
									</S.MenuContainer>
								) : (
									<S.CenteredContainer>
										<Empty />

										<Text color="#666" style={{ marginTop: 24 }}>
									Nenhum produto foi encontrado!
										</Text>
									</S.CenteredContainer>
								)}
							</>
						)}


					</>
				)}

			</S.Container>


			{selectedTable && (
				<S.Footer>
					<S.FooterContainer>
						{/* 	{!selectedTable &&
					<Button
						disabled={isLoading}
						onPress={() => setIsTableModalVisible(true)}
					>
						Novo Pedido
					</Button>
					} */}

						<Cart
							selectedTable={selectedTable}
							onAdd={handleAddToCart}
							cartItems={cartItems}
							onDecrement={handleDecrementCartItem}
							onConfirmOrder={handleResetOrder}
						/>

					</S.FooterContainer>
				</S.Footer>
			)}


			<TableModal
				onSave={handleSaveTable}
				onClose={() => setIsTableModalVisible(false)}
				visible={isTableModalVisible}
			/>
		</>

	);
}
