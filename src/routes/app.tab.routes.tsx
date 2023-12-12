import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { Home } from '../screens/Home';
import { PropsNavigationStack } from './models';
import { HomeIcon } from '../components/Icons/HomeIcon';

const { Navigator, Screen } = createBottomTabNavigator<PropsNavigationStack>();
const Stack = createNativeStackNavigator();

function AppTabRoutes() {

	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#D73035',
				tabBarInactiveTintColor: '#666666',
				tabBarShowLabel: true, // Exibir o texto do tabBarLabel
				tabBarStyle: {
					backgroundColor: '#FFFFFF',
					minHeight: 72
				},
				tabBarLabelStyle: {
					fontSize: 12,
				},
			}}
		>
			<Screen
				name='Home'
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<HomeIcon
							color={color}

						/>
					),
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
