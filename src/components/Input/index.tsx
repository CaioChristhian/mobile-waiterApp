import React, { useState } from 'react';

import * as S from './styles';
import { TextInputProps, TouchableOpacity } from 'react-native';
import { Eye } from '../../components/Icons/Eye';
import { EyeHidden } from '../../components/Icons/EyeHidden';

interface InputProps extends TextInputProps {
	isPassword?: boolean;
	placeholder: string;
}

export function Input({ isPassword, ...rest }: InputProps){
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	return (
		<S.InputContainer isFocused={isFocused}>
			<S.StyledTextInput
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				secureTextEntry={!isPasswordVisible && isPassword}
				{...rest}
				cursorColor='#D73035'
			/>
			{isPassword && (
				<S.IconContainer>
					<TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
						{isPasswordVisible ? <Eye /> : <EyeHidden />}
					</TouchableOpacity>
				</S.IconContainer>
			)}
		</S.InputContainer>
	);
}
