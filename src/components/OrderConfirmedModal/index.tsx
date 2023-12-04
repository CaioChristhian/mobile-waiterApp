import React from 'react';
import { Modal } from 'react-native';

import * as S from './styles';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';

interface OrderConfirmedModalProps {
	visible: boolean;
	onOk: () => void;
}

export function OrderConfirmedModal({ visible, onOk }: OrderConfirmedModalProps){
	return (
		<Modal
			visible={visible}
			animationType='fade'
		>
			<S.Container>
				<CheckCircle />

				<Text color="#FFF" size={20} weight="600" style={{ marginTop: 12, marginBottom: 4 }}>Pedido Confirmado</Text>
				<Text color="#FFF" opacity={0.9}>O Pedido já entrou na fila de produção!</Text>

				<S.OkButton onPress={onOk}>
					<Text color="#D73035" weight="600">OK</Text>
				</S.OkButton>
			</S.Container>
		</Modal>
	);
}
