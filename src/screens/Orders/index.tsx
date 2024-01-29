import React, { useEffect, useState, useMemo } from 'react';

import { Text } from '../../components/Text';
import { CardOrder } from '../../components/CardOrder';

import * as S from './styles';
import { FlatList } from 'react-native';
import { api } from '../../utils/api';
import { Order } from '../../types/Order';

export function Orders(){
	const [orders, setOrders] = useState<Order[]>([]);
	const [isGoing, setIsGoing] = useState(true);

	useEffect(() => {
		Promise.resolve(api.get('/orders')).then((ordersResponse) => {
			const orders = ordersResponse.data;

			setOrders(orders);
		});
	}, [orders]);

	const filteredOrders = useMemo(() => {
		return orders.filter(order => {
			if (isGoing) {
				return order.status !== 'FINISHED';
			} else {
				return order.status === 'FINISHED';
			}
		});
	}, [orders, isGoing]);


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
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{  paddingBottom: 140 }}
					data={filteredOrders}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<CardOrder
							_id={item._id}
							products={item.products}
							table={item.table}
							status={item.status}
						/>
					)}
				/>
			</S.OrdersContainer>
		</S.Container>
	);
}
