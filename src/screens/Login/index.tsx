import React, { useState } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import * as S from './styles';
import { Info } from '../../components/Icons/Info';
import { LoginLoadModal } from '../../components/LoginLoadModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from '../../routes/models';


export function Login(){
	const navigation = useNavigation<PropsStack>();
	const { onLogin } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorEmail, setErrorEmail] = useState(false);
	const [errorPasword, setErrorPasword] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const onPressSignUp = () => {
		navigation.navigate('SignUp');
	};

	async function handleLogin() {
		setLoading(true);
		try {
			const result = await onLogin!(email, password);
			if (result && result.error) {
				setErrorEmail(true);
				setErrorPasword(true);
			}
		} catch (error) {
			console.error('Erro ao realizar login:', error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<LoginLoadModal visible={isLoading} />

			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<SafeAreaView
					style={{ flex: 1, backgroundColor: '#FFF' }}
				>
					<KeyboardAvoidingView
						style={{ flex: 1}}
						behavior={Platform.OS === 'android' ? undefined : 'padding'}
					>
						<S.Container>
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

							<S.ButtonsContainer>
								<Button style={{ width: '100%' }}  onPress={handleLogin}>Fazer Login</Button>
								<S.SignUpButton onPress={onPressSignUp}>
									<Text color='#D73035' size={18}>Cadastrar-se</Text>
								</S.SignUpButton>
							</S.ButtonsContainer>
						</S.Container>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</>
	);
}
