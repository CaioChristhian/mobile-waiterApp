import React from 'react';
import { FlatList } from 'react-native';

import * as S from './styles';
import { products } from '../../mocks/products';
import { Text } from '../Text';

export function Menu(){
	return (
		<FlatList
			data={products}
			style={{ marginTop: 32 }}
			contentContainerStyle={{ paddingHorizontal: 24 }}
			keyExtractor={product => product._id}
			renderItem={({ item: product }) => (
				<S.Product>
					<S.Image
						source={{ uri: `htt://localhost:3001/uploads/${product.imagePath}` }}
					/>

					<S.ProductDetails>
						<Text>{product.name}</Text>
						<Text>{product.description}</Text>
						<Text>{product.price}</Text>
					</S.ProductDetails>
				</S.Product>
			)}
		/>
	);
}
