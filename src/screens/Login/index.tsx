import React, { useState } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import * as S from './styles';


export function Login(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');



	function handleLogin() {
		console.log(email);
		console.log(password);
	}

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
							onChangeText={setEmail}
							placeholderTextColor='#999999'
							placeholder='Seu e-mail de acesso'
						/>
					</S.InputContainer>

					<S.InputContainer>
						<Text style={{ marginBottom: 8 }}>Senha</Text>
						<Input
							onChangeText={setPassword}
							isPassword
							placeholderTextColor='#999999'
							placeholder='Informe sua Senha'
						/>
					</S.InputContainer>
				</S.Form>

				<Button style={{ width: '100%' }}  onPress={handleLogin}>Fazer Login</Button>
			</S.Container>
		</TouchableWithoutFeedback>
	);
}
