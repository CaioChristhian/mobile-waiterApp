import React from 'react';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { Main } from '../Main';
import { PropsNavigationStack } from './models';




const { Navigator, Screen } = createBottomTabNavigator<PropsNavigationStack>();
const Stack = createNativeStackNavigator();

function AppTabRoutes() {
	const theme = useTheme();

	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme.colors.main,
				tabBarInactiveTintColor: theme.colors.text_detail,
				tabBarShowLabel: true, // Exibir o texto do tabBarLabel
				tabBarStyle: {
					backgroundColor: theme.colors.background_primary,
				},
				tabBarLabelStyle: {
					fontSize: 12,
				},
			}}
		>
			<Screen
				name='Main'
				component={Main}
				options={{
					tabBarLabel: 'Home', // Texto do bottom tab
				}}
			/>

		</Navigator>
	);
}

export const AppRoutes = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
			initialRouteName='Login'
		>
			<Stack.Screen name='Login' component={Login} />
			<Stack.Screen name='tab' component={AppTabRoutes} />

		</Stack.Navigator>
	);
};
