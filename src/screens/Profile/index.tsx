import React, { useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';

import * as S from './styles';
import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Button';



export function Profile(){
	const headerHeight = useHeaderHeight();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	function handleChangeProfile() {
		console.log(name);
		console.log(email);
		console.log(password);
		console.log(confirmPassword);
	}

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
						<Input
							onChangeText={setName}
						/>

						<Text style={{ marginBottom: 8, marginTop: 24 }} color='#666666'>E-mail</Text>
						<Input
							onChangeText={setEmail}
						/>

						<Text style={{ marginBottom: 8, marginTop: 24 }} color='#666666'>Senha</Text>
						<Input
							isPassword
							onChangeText={setPassword}
						/>

						<Text style={{ marginBottom: 8, marginTop: 24 }} color='#666666'>Confirmação da Senha</Text>
						<Input
							isPassword
							onChangeText={setConfirmPassword}
						/>

					</S.Form>
					<Button style={{ marginTop: 32 }} onPress={handleChangeProfile}>Salvar Alterações</Button>
				</S.Container>
			</TouchableWithoutFeedback>
		</>
	);
}
