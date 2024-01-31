import React, { useState } from 'react';
import * as S from './styles';
import { Text } from '../Text';
import { StatusBallIcon } from '../Icons/StatusBallIcon';
import { Status, statusColors, statusColorsBackground, statusDisplayNames } from '../../utils/statusOrders';
import { Order } from '../../types/Order';
import { Modal, Platform } from 'react-native';
import { api } from '../../utils/api';
import { Close } from '../Icons/Close';
import { EditIcon } from '../Icons/EditIcon';

const STATUS_OPTIONS = [
	{ label: 'Aguardando', value: Status.WAITING },
	{ label: 'Entrou em Produção', value: Status.IN_PRODUCTION },
	{ label: 'Pronto!', value: Status.DONE },
	{ label: 'Finalizado', value: Status.FINISHED }
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
						<Text style={{marginLeft: 8, marginRight: 4}} color={statusColors[status]}>{statusDisplayNames[status]}</Text>
						<EditIcon color={statusColors[status]} width={16} height={16} />
					</S.StatusCard>
				</S.StatusWrapper>
			</S.HeaderContent>

			<Modal
				transparent
				animationType="fade"
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<S.Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
					<S.ModalBody>
						<S.HeaderModal>
							<S.CloseButton onPress={() => setIsModalVisible(false)}>
								<Close />
							</S.CloseButton>
						</S.HeaderModal>

						<Text style={{ alignSelf: 'center', marginTop: 8, marginBottom: -8 }} size={18} weight='700'>Selecione o status do pedido!</Text>

						<S.ModalOptions>
							{STATUS_OPTIONS.map((option) => (
								<S.StatusOptionButton
									style={{
										backgroundColor: statusColorsBackground[option.value]
									}}
									key={option.value}
									onPress={() => changeStatus(option.value, _id)}
								>
									<StatusBallIcon width={12} height={12} color={statusColors[option.value]} />
									<Text style={{marginLeft: 8}} color={statusColors[option.value]} weight='600' size={16}>{option.label}</Text>
								</S.StatusOptionButton>
							))}
						</S.ModalOptions>
					</S.ModalBody>
				</S.Overlay >
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
