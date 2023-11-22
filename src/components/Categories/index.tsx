import React, { useState } from 'react';

import { Text } from '../Text';
import { categories } from '../../mocks/categories';

import * as S from './styles';
import { FlatList } from 'react-native';

export function Categories(){
	const [selectedCategory, setSelectedCategory] = useState('');


	function handleSelectCategory(categoryId: string) {
		const category = selectedCategory === categoryId ? '' : categoryId;
		setSelectedCategory(category);
	}

	return (
		<>
			<FlatList
				showsHorizontalScrollIndicator={false}
				data={categories}
				keyExtractor={category => category._id}
				horizontal
				contentContainerStyle={{ paddingRight: 24 }}
				renderItem={({ item: category }) => {
					const isSelected = selectedCategory === category._id;

					return (
						<S.Category onPress={() => handleSelectCategory(category._id)}>
							<S.Icon>
								<Text opacity={isSelected ? 1 : 0.5} >{category.icon}</Text>
							</S.Icon>

							<Text opacity={isSelected ? 1 : 0.5} size={14} weight="500">{category.name}</Text>
						</S.Category>
					);
				}}
			/>
		</>
	);
}
