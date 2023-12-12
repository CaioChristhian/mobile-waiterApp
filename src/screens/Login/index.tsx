import React, { useState } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import * as S from './styles';
import { Info } from '../../components/Icons/Info';
import { LoginLoadModal } from '../../components/LoginLoadModal';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../routes/models';

const mocks = {
	email: 'caio@gmail.com',
	password: '1234',
};

export function Login(){
	const navigation = useNavigation<PropsStack>();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorEmail, setErrorEmail] = useState(false);
	const [errorPasword, setErrorPasword] = useState(false);
	const [isLoading, setLoading] = useState(false);


	function handleLogin() {
		console.log(email);
		console.log(password);

		if (email != mocks.email) {
			setErrorEmail(true);
			return;
		}

		setErrorEmail(false);

		if (password != mocks.password) {
			setErrorPasword(true);
			return;
		}

		setErrorPasword(false);

		setLoading(true);

		setInterval(() => setLoading(false), 3000);

		navigation.navigate('tab');
	}

	return (
		<>
			<LoginLoadModal visible={isLoading} />

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
								error={errorEmail}
							/>

							{errorEmail && (
								<S.ErrorContainer>
									<Info />
									<Text color='#D73035' style={{ paddingLeft: 6 }}>E-mail não cadastrado. Tente novamente</Text>
								</S.ErrorContainer>
							)}
						</S.InputContainer>

						<S.InputContainer>
							<Text style={{ marginBottom: 8 }}>Senha</Text>
							<Input
								onChangeText={setPassword}
								isPassword
								placeholderTextColor='#999999'
								placeholder='Informe sua Senha'
								error={errorPasword}
							/>

							{errorPasword && (
								<S.ErrorContainer>
									<Info />
									<Text color='#D73035' style={{ paddingLeft: 6, paddingBottom: 18 }}>Senha incorreta. Tente novamente</Text>
								</S.ErrorContainer>
							)}
						</S.InputContainer>
					</S.Form>

					<Button style={{ width: '100%' }}  onPress={handleLogin}>Fazer Login</Button>
				</S.Container>
			</TouchableWithoutFeedback>
		</>
	);
}
