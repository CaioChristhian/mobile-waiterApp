import styled from 'styled-components/native';


export const Container = styled.KeyboardAvoidingView`
	flex: 1;
	background: #FFFF;
	align-items: center;
	justify-content: space-around;
	padding: 24px;
`;

export const BackButton = styled.TouchableOpacity`
	position: absolute;
	left: 0;
	padding: 24px;
`;

export const HeaderTitle = styled.View`
	align-items: center;
`;

export const Form = styled.ScrollView`
	width: 100%;
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
