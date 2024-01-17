import React from 'react';

import * as S from './styles';
import { Text } from '../../components/Text';

export function Orders(){
	return (
		<S.Container>
			<S.Header>
				<Text size={24} weight='600'>Pedidos</Text>
			</S.Header>

			<S.OnGoingOrdersContainer>
				<Text weight='600' color='#666666' size={18} style={{ marginBottom: 24 }}>
					Em andamento
				</Text>

				<S.OnGoingOrdersContent>
					<S.HeaderContent>
						<Text weight='600'>Mesa123</Text>

						<S.StatusCard>
							<Text>Pronto!</Text>
						</S.StatusCard>
					</S.HeaderContent>

					<S.IngredientsContainer>
						<S.IngredientsContent>
							<Text color='#999999' style={{ paddingRight: 8 }}>1x</Text>
							<Text>Frango com Catupiry</Text>
						</S.IngredientsContent>

						<S.IngredientsContent>
							<Text color='#999999' style={{ paddingRight: 8 }}>2x</Text>
							<Text>Quatro Queijos</Text>
						</S.IngredientsContent>
					</S.IngredientsContainer>
				</S.OnGoingOrdersContent>

			</S.OnGoingOrdersContainer>

			<S.BeforeOrdersContainer>

			</S.BeforeOrdersContainer>
		</S.Container>
	);
}
