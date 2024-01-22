import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/Login';
import { Home } from '../screens/Home';
import { Orders } from '../screens/Orders';
import { Text } from '../components/Text';

import { HomeIcon } from '../components/Icons/HomeIcon';
import { OrderIcon } from '../components/Icons/OrderIcon';
import { ProfileIcon } from '../components/Icons/ProfileIcon';

import { PropsNavigationStack } from './models';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createBottomTabNavigator<PropsNavigationStack>();
const Stack = createNativeStackNavigator();

interface PropsCustomTabBarLabel {
	label: string;
	focused: boolean;
	color: string;
}

const CustomTabBarLabel = ({ label, focused, color }: PropsCustomTabBarLabel) => (
	<>
		<Text color={color} size={14}>{label}</Text>
		<View style={{ borderBottomWidth: focused ? 2 : 0, borderBottomColor: '#D73035', width: 12, marginTop: 4 }}></View>
	</>
);

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
					minHeight: 72,
					paddingBottom: 8,
				},
				tabBarLabelStyle: {
					fontSize: 12,
				},
				tabBarIconStyle: {
					marginBottom: -12
				}
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
					tabBarLabel: ({ focused, color }) => (
						<CustomTabBarLabel color={color} label='Home' focused={focused} />
					),
				}}
			/>

			<Screen
				name='Orders'
				component={Orders}
				options={{
					tabBarIcon: ({ color }) => (
						<OrderIcon
							color={color}
						/>
					),
					tabBarLabel: ({ focused, color }) => (
						<CustomTabBarLabel color={color} label='Pedidos' focused={focused} />
					),
				}}
			/>

			<Screen
				name='Profile'
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<ProfileIcon
							color={color}
						/>
					),
					tabBarLabel: ({ focused, color }) => (
						<CustomTabBarLabel color={color} label='Perfil' focused={focused} />
					),
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
