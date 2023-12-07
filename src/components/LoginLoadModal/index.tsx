import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';

import { Text } from '../Text';

import * as S from './styles';

interface LoginLoadModal {
	visible: boolean;
}

export function LoginLoadModal({ visible }: LoginLoadModal){

	return (
		<Modal
			visible={visible}
			animationType='fade'
		>
			<S.Container>
				<S.Header>
					<Text color="#FFF" size={14} weight="400">Bem-vindo(a) ao</Text>
					<Text style={{ marginTop: 4 }} color='#FFF' size={24} weight="700">
						WAITTER
						<Text color='#FFF' size={24}>APP</Text>
					</Text>
				</S.Header>

				{visible && (
					<ActivityIndicator color="#FFF" size="large" />
				)}

				<Text size={16} weight='600' style={{ marginTop: 28 }} color="#FFF">Atualizando o cardápio.</Text>
			</S.Container>
		</Modal>
	);
}
