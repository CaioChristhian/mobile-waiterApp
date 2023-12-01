import React, { useState } from 'react';

import { Text } from '../Text';

import * as S from './styles';
import { FlatList } from 'react-native';
import { Category } from '../../types/Category';

interface CategoriesProps {
	categories: Category[];
	onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps){
	const [selectedCategory, setSelectedCategory] = useState('');


	function handleSelectCategory(categoryId: string) {
		const category = selectedCategory === categoryId ? '' : categoryId;

		onSelectCategory(category);
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
						<S.CategoryContainer onPress={() => handleSelectCategory(category._id)}>
							<S.Icon>
								<Text opacity={isSelected ? 1 : 0.5} >{category.icon}</Text>
							</S.Icon>

							<Text opacity={isSelected ? 1 : 0.5} size={14} weight="500">{category.name}</Text>
						</S.CategoryContainer>
					);
				}}
			/>
		</>
	);
}
