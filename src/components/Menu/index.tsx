import React, { useState } from 'react';
import { FlatList } from 'react-native';

import * as S from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Product } from '../../types/Product';
import { baseURLApi } from '../../utils/api';

interface MenuProps {
	onAddToCart: (product: Product) => void;
	products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps){
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);


	function handleOpenModal(product: Product) {
		setIsModalVisible(true);
		setSelectedProduct(product);
	}

	return (
		<>
			<ProductModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				product={selectedProduct}
				onAddToCart={onAddToCart}
			/>

			<FlatList
				showsVerticalScrollIndicator={false}
				data={products}
				style={{ marginTop: 32 }}
				contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
				keyExtractor={product => product._id}
				ItemSeparatorComponent={S.Separator}
				renderItem={({ item: product }) => (

					<S.ProductContainer onPress={() => handleOpenModal(product)}>
						<S.Image
							source={{ uri: `${baseURLApi}/uploads/${product.imagePath}` }} /* http://localhost:3001/uploads/${product.imagePath} */
						/>

						<S.ProductDetails>
							<Text weight="600" >{product.name}</Text>
							<Text size={14} color="#666" style={{ marginVertical: 8 }}>{product.description}</Text>
							<Text size={14} weight="600">{formatCurrency(product.price)}</Text>
						</S.ProductDetails>

						<S.AddToCartButton onPress={() => onAddToCart(product)}>
							<PlusCircle />
						</S.AddToCartButton>
					</S.ProductContainer>

				)}
			/>
		</>
	);
}
