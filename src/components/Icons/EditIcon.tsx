import { SvgXml } from 'react-native-svg';

interface Props {
	color: string;
	width: number;
	height: number;
}

export function EditIcon({ color, width = 8, height = 8 }: Props) {
	const markup = `<svg width="${width}" height="${height}" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M11.5029 4.69092H4.50287C3.97244 4.69092 3.46373 4.90163 3.08865 5.2767C2.71358 5.65178 2.50287 6.16048 2.50287 6.69092V20.6909C2.50287 21.2214 2.71358 21.7301 3.08865 22.1051C3.46373 22.4802 3.97244 22.6909 4.50287 22.6909H18.5029C19.0333 22.6909 19.542 22.4802 19.9171 22.1051C20.2922 21.7301 20.5029 21.2214 20.5029 20.6909V13.6909" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M19.0029 3.1909C19.4007 2.79308 19.9403 2.56958 20.5029 2.56958C21.0655 2.56958 21.605 2.79308 22.0029 3.1909C22.4007 3.58873 22.6242 4.12829 22.6242 4.6909C22.6242 5.25351 22.4007 5.79308 22.0029 6.1909L12.5029 15.6909L8.50287 16.6909L9.50287 12.6909L19.0029 3.1909Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>`;

	return <SvgXml xml={markup} />;
}
