import React from 'react';
import { useHeaderHeight } from '@react-navigation/elements';

import * as S from './styles';
import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Button';


export function Profile(){
	const headerHeight = useHeaderHeight();

	return (
		<>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<S.Container
					behavior={Platform.OS === 'android' ? 'height' : 'padding'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight + 40 : 20}
				>
					<S.Header>
						<Text size={24} weight='600'>Meu Perfil</Text>
					</S.Header>

					<S.Form showsVerticalScrollIndicator={false}>
						<Text style={{ marginBottom: 8 }} color='#666666'>Nome</Text>
						<Input />

						<Text style={{ marginBottom: 8, marginTop: 24 }} color='#666666'>E-mail</Text>
						<Input />

						<Text style={{ marginBottom: 8, marginTop: 24 }} color='#666666'>Senha</Text>
						<Input isPassword />

						<Text style={{ marginBottom: 8, marginTop: 24 }} color='#666666'>Confirmação da Senha</Text>
						<Input isPassword />

					</S.Form>
					<Button  disabled style={{ marginTop: 32 }} onPress={() => alert('oi')}>Salvar Alterações</Button>
				</S.Container>
			</TouchableWithoutFeedback>
		</>
	);
}
