import React, { useState } from 'react';

import * as S from './styles';
import { TextInputProps } from 'react-native';
import { Eye } from '../../components/Icons/Eye';
import { EyeHidden } from '../../components/Icons/EyeHidden';

interface InputProps extends TextInputProps {
	isPassword?: boolean;
	placeholder: string;
	error?: boolean;
}

export function Input({ isPassword, error, ...rest }: InputProps){
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	return (
		<S.InputContainer isFocused={isFocused} error={error}>
			<S.StyledTextInput
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				secureTextEntry={!isPasswordVisible && isPassword}
				{...rest}
				cursorColor='#D73035'
			/>

			{isPassword && (
				<S.IconContainer onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
					{isPasswordVisible ? <Eye /> : <EyeHidden />}
				</S.IconContainer>
			)}
		</S.InputContainer>
	);
}
