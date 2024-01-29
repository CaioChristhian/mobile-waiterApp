import React, { useState } from 'react';
import * as S from './styles';
import { Text } from '../Text';
import { StatusBallIcon } from '../Icons/StatusBallIcon';
import { Status, statusColors, statusColorsBackground, statusDisplayNames } from '../../utils/statusOrders';
import { Order } from '../../types/Order';
import { Modal, TouchableOpacity, View } from 'react-native';
import { api } from '../../utils/api';

const STATUS_OPTIONS = [
	{ label: 'Aguardando', value: Status.WAITING },
	{ label: 'Em Produção', value: Status.IN_PRODUCTION },
	{ label: 'Concluído', value: Status.DONE },
	{ label: 'Finalizado', value: Status.FINISHED }
	// Adicione mais status conforme necessário
];

export function CardOrder({ _id, table, status, products }: Order){
	const [isModalVisible, setIsModalVisible] = useState(false);

	async function changeStatus(newStatus: Status, orderId: string) {
		try {
			const response = await api.patch(`/orders/${orderId}`, {
				status: newStatus
			});
			setIsModalVisible(false);
			console.log('Order Atualizado', response.data);
		} catch (error) {
			console.log('Erro ao atualizar status da order');
		}
	}

	return (
		<S.Container>
			<S.HeaderContent>
				<Text weight='600'>Mesa {table}</Text>

				<S.StatusWrapper
					onPress={() => setIsModalVisible(true)}
					style={{
						backgroundColor: statusColorsBackground[status]
					}}
				>
					<S.StatusCard>
						<StatusBallIcon width={12} height={12} color={statusColors[status]} />
						<Text style={{marginLeft: 8}} color={statusColors[status]}>{statusDisplayNames[status]}</Text>
					</S.StatusCard>
				</S.StatusWrapper>
			</S.HeaderContent>

			<Modal
				animationType="slide"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<View >
					{STATUS_OPTIONS.map((option) => (
						<TouchableOpacity key={option.value} onPress={() => changeStatus(option.value, _id)}>
							<Text>{option.label}</Text>
						</TouchableOpacity>
					))}
				</View>
			</Modal>

			<S.IngredientsContainer>
				{products.map((product) => (
					<S.IngredientsContent key={product._id}>
						<Text color='#999999' style={{ paddingRight: 8 }}>{product.quantity}x</Text>
						<Text>{product.product.name}</Text>
					</S.IngredientsContent>
				))}
			</S.IngredientsContainer>
		</S.Container>
	);
}
