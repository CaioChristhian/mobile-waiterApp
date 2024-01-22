import React from 'react';

import * as S from './styles';
import { Text } from '../Text';
import { StatusBallIcon } from '../Icons/StatusBallIcon';

interface CardOrderProps {
	table: string;
	status: 'Pronto!' | 'Entrou em produção' | 'Finalizado em dd/mm/yyyy';
	ingredients: Array<{ quantity: number, name: string }>;
}

const statusColorsBackground = {
	'Pronto!': 'rgba(48,215,135, 0.05)',
	'Entrou em produção': 'rgba(215,108,48, 0.05)',
	'Finalizado em dd/mm/yyyy': 'rgba(102, 102, 102, 0.05)',
};

const statusColors = {
	'Pronto!': '#30D787',
	'Entrou em produção': '#D76C30',
	'Finalizado em dd/mm/yyyy': '#666666',
};


export function CardOrder({ table, status, ingredients }: CardOrderProps){
	return (
		<S.Container>
			<S.HeaderContent>
				<Text weight='600'>Mesa {table}</Text>

				<S.StatusWrapper style={{
					backgroundColor: statusColorsBackground[status]
				}}>
					<S.StatusCard>
						<StatusBallIcon width={12} height={12} color={statusColors[status]} />
						<Text style={{marginLeft: 8}} color={statusColors[status]}>{status}</Text>
					</S.StatusCard>
				</S.StatusWrapper>
			</S.HeaderContent>

			<S.IngredientsContainer>
				{ingredients.map((ingredient, index) => (
					<S.IngredientsContent key={index}>
						<Text color='#999999' style={{ paddingRight: 8 }}>{ingredient.quantity}x</Text>
						<Text>{ingredient.name}</Text>
					</S.IngredientsContent>
				))}
			</S.IngredientsContainer>


		</S.Container>
	);
}
