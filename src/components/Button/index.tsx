/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import * as S from './styles';
import { Text } from '../Text';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
	children: string;
	onPress: (() => Promise<void>) | (() => void) | undefined;
	disabled?: boolean;
	loading?: boolean;
}

export function Button({ children, onPress, disabled, loading, ...rest }: ButtonProps){
	return (
		<S.Container {...rest} onPress={onPress} disabled={disabled || loading}>
			{!loading && (
				<Text weight="600" color="#FFF">{children}</Text>
			)}

			{loading && (
				<ActivityIndicator color="#fff" />
			)}
		</S.Container>
	);
}
