import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
	flex: 1;
	background: #FFFF;
	padding: 24px;
	margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` :  '0'};
	justify-content: space-around;
`;


export const HeaderTitle = styled.View`
	align-items: center;
`;

export const Form = styled.View`
	width: 100%;
`;

export const InputContainer = styled.View<{ isFirst?: boolean }>`
	width: 100%;
	align-items: flex-start;
	margin-bottom: ${props => props.isFirst ? '24px' : '0'};
`;

export const ErrorContainer = styled.View`
	flex-direction: row;
	margin-top: 8px;
`;

export const ButtonsContainer = styled.View`
	width: 100%;
	align-items: center;
	padding-top: 14px;
`;

export const SignUpButton = styled.TouchableOpacity`
	padding-top: 14px;
`;
