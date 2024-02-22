import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
	flex: 1;
	background: #FFFF;
	padding: 24px;
`;

export const BackButton = styled.TouchableOpacity`
	position: absolute;
	left: 0;
	padding: 24px;
	margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` :  '0'};
`;

export const HeaderTitle = styled.View`
	align-items: center;
	margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` :  '0'};
`;

export const Form = styled.ScrollView`
	width: 100%;
	margin-top: 18px;
`;

export const InputContainer = styled.View<{ isFirst?: boolean }>`
	width: 100%;
	align-items: flex-start;
	margin-bottom: 24px;
`;

export const ErrorContainer = styled.View`
	flex-direction: row;
	margin-top: 8px;
`;
