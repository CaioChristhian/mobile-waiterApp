import React from 'react';

import * as S from './styles';
import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

export function Login(){
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<S.Container behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
				<S.HeaderTitle>
					<Text color="#333333" size={14} weight="400">Bem-vindo(a) ao</Text>
					<Text size={24} weight="600">
						WAITTER
						<Text size={24}>APP</Text>
					</Text>
				</S.HeaderTitle>

				<S.Form>
					<S.InputContainer isFirst={true}>
						<Text style={{ marginBottom: 8 }}>E-mail</Text>
						<Input
							placeholderTextColor='#999999'
							placeholder='Seu e-mail de acesso'
						/>
					</S.InputContainer>

					<S.InputContainer>
						<Text style={{ marginBottom: 8 }}>Senha</Text>
						<Input
							isPassword
							placeholderTextColor='#999999'
							placeholder='Informe sua Senha'
						/>
					</S.InputContainer>
				</S.Form>

				<Button style={{ width: '100%' }}  onPress={() => alert('login')}>Fazer Login</Button>
			</S.Container>
		</TouchableWithoutFeedback>
	);
}
