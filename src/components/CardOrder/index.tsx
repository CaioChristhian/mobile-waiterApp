import React, { useState } from 'react';
import * as S from './styles';
import { Text } from '../Text';
import { StatusBallIcon } from '../Icons/StatusBallIcon';
import { Status, statusColors, statusColorsBackground, statusDisplayNames } from '../../utils/statusOrders';
import { Order } from '../../types/Order';
import { Alert, Modal, Platform } from 'react-native';
import { api } from '../../utils/api';
import { Close } from '../Icons/Close';
import { EditIcon } from '../Icons/EditIcon';
import { formatCurrency } from '../../utils/formatCurrency';

const STATUS_OPTIONS = [
	{ label: 'Aguardando', value: Status.WAITING },
	{ label: 'Entrou em Produção', value: Status.IN_PRODUCTION },
	{ label: 'Pronto!', value: Status.DONE },
	{ label: 'Finalizado', value: Status.FINISHED }
];

export function CardOrder({ _id, table, status, products, user }: Order){
	const [isModalVisible, setIsModalVisible] = useState(false);

	const total = products.reduce((acc, product) => acc + (product.quantity * product.product.price), 0);

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

	function handleCancelOrder(orderId: string) {
		Alert.alert(
			'Tem certeza?',
			'Deseja realmente deletar o pedido?',
			[
				{
					text: 'Cancelar',
					onPress: () => console.log('Cancelado'),
					style: 'cancel',
				},
				{
					text: 'Deletar',
					onPress: () => {
						api.delete(`/orders/${orderId}`);
					}
				},
			],
			{ cancelable: false }
		);
	}

	const formatUsername = (username: string) => {
		const maxLength = 10;
		if (username.length > maxLength) {
			return `${username.substring(0, maxLength)}-\n${username.substring(maxLength)}`;
		}
		return username;
	};

	return (
		<>
			<S.Container>
				<S.HeaderContent>
					<Text size={18} weight='600'>Mesa {table}</Text>

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


				<S.Separator></S.Separator>

				<S.IngredientsContainer>
					{products.map((product) => (
						<S.IngredientsContent key={product._id}>
							<Text color='#999999' style={{ paddingRight: 8 }}>{product.quantity}x</Text>
							<Text>{product.product.name}</Text>
							<S.Total>
								<Text>{formatCurrency(product.quantity * product.product.price)}</Text>
							</S.Total>
						</S.IngredientsContent>
					))}

					<S.Separator></S.Separator>

					<S.Footer>
						<Text weight='600' color='#D73035'>Atendente:  <Text weight='600'>{formatUsername(user.username)}</Text></Text>

						<Text weight='700'>Total: {formatCurrency(total)}</Text>
					</S.Footer>
				</S.IngredientsContainer>
			</S.Container>

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

						<S.CancelOrderButton onPress={() => handleCancelOrder(_id)}>
							<Text color='#D73035'>Deletar Pedido</Text>
						</S.CancelOrderButton>
					</S.ModalBody>
				</S.Overlay >
			</Modal>
		</>
	);
}
