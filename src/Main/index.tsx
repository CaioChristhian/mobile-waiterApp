import React from 'react';

import { Header } from '../components/Header';

import * as S from './styles';
import { Categories } from '../components/Categories';
import { Button } from '../components/Button';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';

export function Main(){
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
					<Button onPress={() => alert('novo pedido')}>
						Novo Pedido
					</Button>
				</S.FooterContainer>
			</S.Footer>

			<TableModal />
		</>

	);
}
