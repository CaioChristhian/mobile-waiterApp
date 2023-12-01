import React from 'react';

import * as S from './styles';
import { Text } from '../Text';
import { ActivityIndicator } from 'react-native';

interface ButtonProps {
	children: string;
	onPress: () => void;
	disabled?: boolean;
	loading?: boolean;
}

export function Button({ children, onPress, disabled, loading }: ButtonProps){
	return (
		<S.Container onPress={onPress} disabled={disabled || loading}>
			{!loading && (
				<Text weight="600" color="#FFF">{children}</Text>
			)}

			{loading && (
				<ActivityIndicator color="#fff" />
			)}
		</S.Container>
	);
}
