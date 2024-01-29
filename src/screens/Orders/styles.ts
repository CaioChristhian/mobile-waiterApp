import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	background-color: #FAFAFA;
	flex: 1;
`;

export const Header = styled.View`
	margin-top: 20px;
	padding: 24px;
`;

export const OrdersContainer = styled.View`
	padding: 24px;
`;

export const OrdersSituationContainer = styled.View`
	width: 100%;
	height: 46px;
	flex-direction: row;
	align-items: center;
`;

export const IsGoingButton = styled.TouchableOpacity<{ active?: boolean }>`
 flex: 1;
 align-items: center;
 border-bottom-width: ${props => props.active ? '2px' : '0px'};
 border-color: ${props => props.active ? '#D73035' : 'transparent'};
`;

export const IsBeforeButton = styled.TouchableOpacity<{ active?: boolean }>`
 flex: 1;
 align-items: center;
 border-bottom-width: ${props => props.active ? '2px' : '0px'};
 border-color: ${props => props.active ? '#D73035' : 'transparent'};
`;


export const OnGoingOrdersContainer = styled.View``;

export const BeforeOrdersContainer = styled.View``;
