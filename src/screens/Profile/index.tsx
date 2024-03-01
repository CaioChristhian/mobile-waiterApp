import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

import * as S from './styles';


export function Profile(){
	const { onLogout } = useAuth();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const headerHeight = useHeaderHeight();

	const insets = useSafeAreaInsets();

	const keyboardVerticalOffset = Platform.OS === 'ios' ? insets.top + headerHeight :  0;

	function handleChangeProfile() {
		console.log(name);
		console.log(email);
		console.log(password);
		console.log(confirmPassword);
	}

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
									onChangeText={setName}
								/>
							</S.InputContainer>

							<S.InputContainer>
								<Text style={{ marginBottom: 8 }} color='#666666'>E-mail</Text>
								<Input
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
						<Button style={{ marginTop: 32 }} onPress={handleChangeProfile}>Salvar Alterações</Button>
					</S.Container>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}
