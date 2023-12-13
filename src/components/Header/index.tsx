import React from 'react';
import { Text } from '../Text';

import * as S from './styles';
import { TouchableOpacity } from 'react-native';
import { Bell } from '../Icons/Bell';


interface HeaderProps {
	selectedTable: string;
	onCancelOrder: () => void;
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps){
	return (
		<S.Container>
			{!selectedTable && (
				<S.OrderHeader>
					<S.ContainerTitle>
						<Text size={14} opacity={0.9}>Bem vindo(a) ao</Text>
						<Text size={24} weight="600">
						WAITTER
							<Text size={24}>APP</Text>
						</Text>
					</S.ContainerTitle>
					<S.Notifications>
						<Bell color='#333333' />
					</S.Notifications>
				</S.OrderHeader>
			)}

			{selectedTable && (
				<S.OrderContent>
					<S.OrderHeader>
						<Text size={24} weight="600">Pedido</Text>
						<TouchableOpacity onPress={onCancelOrder}>
							<Text color="#D73035" weight="600" size={14}>cancelar pedido</Text>
						</TouchableOpacity>
					</S.OrderHeader>

					<S.Table>
						<Text color="#666">Mesa {selectedTable}</Text>
					</S.Table>
				</S.OrderContent>
			)}
		</S.Container>
	);
}
