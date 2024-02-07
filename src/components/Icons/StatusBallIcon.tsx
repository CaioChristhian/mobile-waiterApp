import { SvgXml } from 'react-native-svg';

interface Props {
	color: string;
	width: number;
	height: number;
}

export function StatusBallIcon({ color, width = 8, height = 8 }: Props) {
	const markup = `<svg width="${width}" height="${height}" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect x="2" y="2" width="4" height="4" rx="2" fill="${color}"/>
	<rect x="1" y="1" width="6" height="6" rx="3" stroke="${color}" stroke-opacity="0.1" stroke-width="2"/>
	</svg>`;

	return <SvgXml xml={markup} />;
}
