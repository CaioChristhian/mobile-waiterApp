import React from 'react';

import { Text } from '../../components/Text';
import { CardOrder } from '../../components/CardOrder';

import * as S from './styles';

export function Orders(){
	return (
		<S.Container>
			<S.Header>
				<Text size={24} weight='600'>Pedidos</Text>
			</S.Header>

			<S.OrdersContainer>
				<S.OnGoingOrdersContainer>
					<Text weight='600' color='#666666' size={18} style={{ marginBottom: 24 }}>
					Em andamento
					</Text>

					<CardOrder
						ingredients={[
							{ quantity: 2, name: 'Frango com Catupiri' },
							{ quantity: 1, name: 'Quatro Queijos' }
						]}
						table='2'
						status='Pronto!'
					/>

					<CardOrder
						ingredients={[
							{ quantity: 2, name: 'Frango com Catupiri' },
							{ quantity: 1, name: 'Quatro Queijos' }
						]}
						table='5'
						status='Entrou em produção'
					/>
				</S.OnGoingOrdersContainer>

				<S.BeforeOrdersContainer>
					<Text weight='600' color='#666666' size={18} style={{ marginBottom: 24, marginTop: 24 }}>
					Anteriores
					</Text>

					<CardOrder
						ingredients={[
							{ quantity: 2, name: 'Frango com Catupiri' },
							{ quantity: 1, name: 'Quatro Queijos' }
						]}
						table='5'
						status='Finalizado em dd/mm/yyyy'
					/>
				</S.BeforeOrdersContainer>
			</S.OrdersContainer>
		</S.Container>
	);
}
