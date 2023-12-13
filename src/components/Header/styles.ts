import { Platform } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';


export const Container = styled.View`
	margin: 24px 24px 0;
`;

export const ContainerTitle = styled.View``;

export const OrderContent = styled.View``;

export const OrderHeader = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const Table = styled.View`
	padding: 16px;
	background: #fff;
	border: 1px solid rgba(204, 204, 204, 0.3);
	border-radius: 8px;
	margin-top: 24px;
`;

export const Notifications = styled.TouchableOpacity`
	background-color: #FFFFFF;
	border-radius: 32px;
	padding: 8px;
	box-shadow: 0px 2px 1px rgba(0, 0, 0, ${isAndroid ? 1 : 0.1});
	elevation: 2;
`;
