import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { TextInputProps } from 'react-native';

interface InputContainerProps {
	isFocused?: boolean;
 }

export const InputContainer = styled.View<InputContainerProps>`
	flex-direction: row;
	align-items: center;
	background: #FFFFFF;
	border: 1px solid ${({ isFocused }) => (isFocused ? '#666666' : 'rgba(204, 204, 204, 0.5)')};
	border-radius: 8px;
	padding: 16px;
	width: 100%;
`;


export const StyledTextInput = styled(TextInput)<TextInputProps>`
	flex: 1;
`;

export const IconContainer = styled.View`
	margin-left: 10px;
`;
