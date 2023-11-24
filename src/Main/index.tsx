import React, { useState } from 'react';

import { Header } from '../components/Header';

import * as S from './styles';
import { Categories } from '../components/Categories';
import { Button } from '../components/Button';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';

export function Main(){
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState('');



	function handleSaveTable(table: string) {
		setSelectedTable(table);
	}

	return (
		<>
			<S.Container>
				<Header />

				<S.CategoriesContainer>
					<Categories />
				</S.CategoriesContainer>

				<S.MenuContainer>
					<Menu />
				</S.MenuContainer>

			</S.Container>
			<S.Footer>
				<S.FooterContainer>
					{!selectedTable &&
					<Button onPress={() => setIsTableModalVisible(true)}>
					Novo Pedido
					</Button>
					}
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
