import { SvgXml } from 'react-native-svg';

interface CloseProps {
  color?: string;
	width?: number;
	height?: number;
}

export function Close({ color, width = 24, height = 24 }: CloseProps) {
	const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="none">
    <path stroke="${color || '#fff'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 8 8 8M16 8l-8 8" />
  </svg>`;

	return <SvgXml xml={markup} />;
}
