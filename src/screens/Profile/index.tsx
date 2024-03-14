import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

import * as S from './styles';
import { api } from '../../utils/api';


export function Profile(){
	const { authState, onLogout, updateUser } = useAuth();

	const [username, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [reload, setReload] = useState(false);
	const [isLoading, setIsLoading] = useState(false);


	const headerHeight = useHeaderHeight();

	const insets = useSafeAreaInsets();

	const keyboardVerticalOffset = Platform.OS === 'ios' ? insets.top + headerHeight :  0;

	async function handleChangeProfile() {

		const _id = authState!.user?._id;

		if (password !== confirmPassword) {
			alert('As senhas não coincidem.');
			return;
		}

		try {
			setIsLoading(true);

			const response = await api.put(`/users/${_id}`, {
				username,
				email,
				password,
			});

			updateUser(response.data.user);
			setReload(!reload);

			setIsLoading(false);
			console.log('Perfil atualizado com sucesso:', response.data);
		} catch (error) {
			setIsLoading(false);
			console.error('Erro ao atualizar perfil');
		}


	}

	useEffect(() => {
		console.log(authState!.user?.username);
		setUserName('');
		setEmail('');
		setPassword('');
		setConfirmPassword('');
	}, [reload]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
				<KeyboardAvoidingView
					style={{flex: 1}}
					enabled={true}
					behavior={Platform.OS === 'android' ? undefined : 'padding'}
					keyboardVerticalOffset={keyboardVerticalOffset}
				>
					<S.Container>
						<S.Header>
							<Text size={24} weight='600'>Meu Perfil</Text>
							<Button onPress={onLogout}>Sair</Button>
						</S.Header>

						<S.Form showsVerticalScrollIndicator={false}>
							<S.InputContainer>
								<Text style={{ marginBottom: 8 }} color='#666666'>Nome</Text>
								<Input
									placeholder={authState!.user?.username}
									onChangeText={setUserName}
								/>
							</S.InputContainer>

							<S.InputContainer>
								<Text style={{ marginBottom: 8 }} color='#666666'>E-mail</Text>
								<Input
									placeholder={authState!.user?.email}
									onChangeText={setEmail}
								/>
							</S.InputContainer>

							<S.InputContainer>
								<Text style={{ marginBottom: 8 }} color='#666666'>Senha</Text>
								<Input
									isPassword
									onChangeText={setPassword}
								/>
							</S.InputContainer>

							<S.InputContainer>
								<Text style={{ marginBottom: 8 }} color='#666666'>Confirmação da Senha</Text>
								<Input
									isPassword
									onChangeText={setConfirmPassword}
								/>
							</S.InputContainer>

						</S.Form>
						<Button loading={isLoading} style={{ marginTop: 32 }} onPress={handleChangeProfile}>Salvar Alterações</Button>
					</S.Container>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}
