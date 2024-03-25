import styled from 'styled-components/native';

export const Container = styled.View`
	background-color: #FFFFFF;
	width: 100%;
	padding: 24px;
	border-radius: 8px;
	margin-bottom: 12px;
`;

export const HeaderContent = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

export const Separator = styled.View`
	width: 100%;
	height: 1px;
	background: rgba(204, 204, 204, 0.3);
	margin: 16px 0;
`;

export const StatusWrapper = styled.TouchableOpacity`
	background-color: rgba(48,215,135, 0.05);
	border-radius: 4px;
`;

export const StatusCard = styled.View`
	padding: 6px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

export const IngredientsContainer = styled.View`
	gap: 4px;
`;

export const IngredientsContent = styled.View`
	flex-direction: row;
`;

export const Total = styled.View`
	margin-left: auto;
`;

export const Footer = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

export const ModalBody = styled.View`
	gap: 12px;
	background-color: #FFFFFF;
	border-radius: 8px;
`;

export const ModalOptions = styled.View`
	align-items: center;
	justify-content: center;
	gap: 12px;
	padding: 24px;
`;

export const Overlay = styled.KeyboardAvoidingView`
	background: rgba(0, 0, 0, 0.7);
	flex: 1;
	align-items: stretch;
	justify-content: center;
	padding: 0 24px;
`;

export const HeaderModal = styled.View`
	width: 100%;
	align-items: flex-end;
	background-color: #D73035;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
`;

export const StatusOptionButton = styled.TouchableOpacity`
	align-items: center;
	flex-direction: row;
	justify-content: center;
	padding: 12px;
	border-radius: 4px;
	width: 100%;
`;

export const CloseButton = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	margin: 24px;
`;


export const CancelOrderButton = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	margin: 24px;
`;
