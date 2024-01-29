import React, { useState } from 'react';

import { Text } from '../../components/Text';
import { CardOrder } from '../../components/CardOrder';

import * as S from './styles';
import { FlatList } from 'react-native';

const orders = [
	{
		ingredients: [
			{ quantity: 2, name: 'Frango com Catupiri' },
			{ quantity: 1, name: 'Quatro Queijos' }
		],
		table: '2',
		status: 'Pronto!'
	},
	{
		ingredients: [
			{ quantity: 2, name: 'Frango com Catupiri' },
			{ quantity: 1, name: 'Quatro Queijos' }
		],
		table: '5',
		status: 'Entrou em produção'
	},
	{
		ingredients: [
			{ quantity: 2, name: 'Frango com Catupiri' },
			{ quantity: 1, name: 'Quatro Queijos' }
		],
		table: '5',
		status: 'Entrou em produção'
	},
	{
		ingredients: [
			{ quantity: 2, name: 'Frango com Catupiri' },
			{ quantity: 1, name: 'Quatro Queijos' }
		],
		table: '5',
		status: 'Entrou em produção'
	},
	{
		ingredients: [
			{ quantity: 2, name: 'Frango com Catupiri' },
			{ quantity: 1, name: 'Quatro Queijos' }
		],
		table: '5',
		status: 'Entrou em produção'
	}
];

const beforeOrders = [
	{
		ingredients: [
			{ quantity: 2, name: 'Frango com Catupiri' },
			{ quantity: 1, name: 'Quatro Queijos' }
		],
		table: '2',
		status: 'Finalizado em dd/mm/yyyy'
	},
	{
		ingredients: [
			{ quantity: 2, name: 'Frango com Catupiri' },
			{ quantity: 1, name: 'Quatro Queijos' }
		],
		table: '5',
		status: 'Finalizado em dd/mm/yyyy'
	},
	{
		ingredients: [
			{ quantity: 2, name: 'Frango com Catupiri' },
			{ quantity: 1, name: 'Quatro Queijos' }
		],
		table: '5',
		status: 'Finalizado em dd/mm/yyyy'
	},
	{
		ingredients: [
			{ quantity: 2, name: 'Frango com Catupiri' },
			{ quantity: 1, name: 'Quatro Queijos' }
		],
		table: '5',
		status: 'Finalizado em dd/mm/yyyy'
	},
	{
		ingredients: [
			{ quantity: 2, name: 'Frango com Catupiri' },
			{ quantity: 1, name: 'Quatro Queijos' }
		],
		table: '5',
		status: 'Finalizado em dd/mm/yyyy'
	}
];


export function Orders(){

	const [isGoing, setIsGoing] = useState(true);

	function handleIsGoingOrders() {
		setIsGoing(true);
	}

	function handleIsBeforeOrders() {
		setIsGoing(false);
	}

	return (
		<S.Container>
			<S.Header>
				<Text size={24} weight='600'>Pedidos</Text>
			</S.Header>

			<S.OrdersSituationContainer>
				<S.IsGoingButton onPress={handleIsGoingOrders} active={isGoing}>
					<Text style={{ marginBottom: 4 }} weight='600' size={16} color={isGoing ? '#000000' : '#666666'}>em andamento</Text>
				</S.IsGoingButton>

				<S.IsBeforeButton onPress={handleIsBeforeOrders} active={!isGoing}>
					<Text style={{ marginBottom: 4 }} weight='600' size={16} color={!isGoing ? '#000000' : '#666666'}>anteriores</Text>
				</S.IsBeforeButton>

			</S.OrdersSituationContainer>

			<S.OrdersContainer>

				{isGoing && (
					<FlatList
						contentContainerStyle={{  paddingBottom: 140 }}
						data={orders}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<CardOrder
								ingredients={item.ingredients}
								table={item.table}
								status={item.status}
							/>
						)}
					/>
				)}

				{!isGoing && (
					<FlatList
						contentContainerStyle={{  paddingBottom: 140 }}
						data={beforeOrders}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<CardOrder
								ingredients={item.ingredients}
								table={item.table}
								status={item.status}
							/>
						)}
					/>
				)}
			</S.OrdersContainer>
		</S.Container>
	);
}
