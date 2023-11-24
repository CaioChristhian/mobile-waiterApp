import { Modal } from 'react-native';
import { Text } from '../Text';

import * as S from './styles';

export function TableModal() {
	return (
		<Modal
			transparent

		>
			<S.Overlay>
				<Text>Alo</Text>
			</S.Overlay>
		</Modal>
	);
}
