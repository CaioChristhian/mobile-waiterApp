import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PropsNavigationStack = {
	Login: undefined;
	Home: undefined;
	Orders: undefined;
	Profile: undefined;
	tab: undefined;
}

export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>
