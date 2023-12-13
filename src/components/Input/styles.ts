import styled from 'styled-components/native';
import { TextInput, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { TextInputProps } from 'react-native';

interface InputContainerProps {
	isFocused?: boolean;
	error?: boolean;
 }

export const InputContainer = styled.View<InputContainerProps>`
	flex-direction: row;
	align-items: center;
	background: #FFFFFF;
	border: 1px solid ${({ isFocused, error }) =>
		error ? '#D73035' : isFocused ? '#666666' : 'rgba(204, 204, 204, 0.5)'
};
	border-radius: 8px;
	width: 100%;
`;


export const StyledTextInput = styled(TextInput)<TextInputProps>`
	flex: 1;
	padding: 16px;
`;

export const IconContainer = styled(TouchableOpacity)<TouchableOpacityProps>`
	padding: 10px;
`;
