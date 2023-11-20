import React from 'react';

import { Header } from '../components/Header';

import * as S from './styles';

export function Main(){
	return (
		<S.Container>
			<Header />

			<S.CategoriesContainer></S.CategoriesContainer>

			<S.MenuContainer></S.MenuContainer>

			<S.Footer></S.Footer>
		</S.Container>
	);
}
