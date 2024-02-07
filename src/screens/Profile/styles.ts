import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.KeyboardAvoidingView`
	background-color: #FAFAFA;
	flex: 1;
	padding: 0 24px 24px;
	margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` :  '44px'};
`;

export const Header = styled.View`
	margin-top: 20px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const Form = styled.ScrollView`
	margin-top: 48px;
`;
