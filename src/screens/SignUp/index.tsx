import React, { useState } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import * as S from './styles';
import { Info } from '../../components/Icons/Info';
import { LoginLoadModal } from '../../components/LoginLoadModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../routes/models';
import { ArrowLeft } from '../../components/Icons/ArrowLeft';


export function SignUp(){
	const navigation = useNavigation<PropsStack>();
	const { onLogin, onRegister } = useAuth();

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorEmail, setErrorEmail] = useState(false);
	const [errorPasword, setErrorPasword] = useState(false);
	const [isLoading, setLoading] = useState(false);

	async function handleLogin() {
		try {
			const result = await onLogin!(email, password);
			if (result && result.error) {
				setErrorEmail(true);
				setErrorPasword(true);
			}
		} catch (error) {
			console.error('Erro ao realizar login:', error);
		}
	}

	async function handleRegister() {
		if (password != confirmPassword) {
			alert('As senhas diferem');
			return;
		}

		setLoading(true);
		try {
			const result = await onRegister!(email, username, password);

			if (result && result.error) {
				alert(result.msg);
			} else {
				handleLogin();
			}
		} catch (error) {
			console.error('Error during registration:', error);
			alert('An error occurred during registration. Please try again.');
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<LoginLoadModal visible={isLoading} />

			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<S.Container behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
					<S.BackButton onPress={navigation.goBack}>
						<ArrowLeft width={24} height={24} color='#D73035' />
					</S.BackButton>

					<S.HeaderTitle>
						<Text color="#333333" size={14} weight="400">Faça seu</Text>
						<Text size={24} weight="600">
						Cadastro
						</Text>
					</S.HeaderTitle>

					<S.Form>
						<S.InputContainer isFirst={true}>
							<Text style={{ marginBottom: 8 }}>Nome de Usuário</Text>
							<Input
								onChangeText={setUsername}
								placeholderTextColor='#999999'
								placeholder='Seu nome de usuário'
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

						<S.InputContainer>
							<Text style={{ marginBottom: 8 }}>Confirme sua Senha</Text>
							<Input
								onChangeText={setConfirmPassword}
								isPassword
								placeholderTextColor='#999999'
								placeholder='Confirme sua Senha'
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

					<Button style={{ width: '100%' }}  onPress={handleRegister}>Cadastrar-se</Button>
				</S.Container>
			</TouchableWithoutFeedback>
		</>
	);
}
