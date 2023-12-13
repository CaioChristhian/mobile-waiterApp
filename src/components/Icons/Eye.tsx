import { SvgXml } from 'react-native-svg';

export function Eye() {
	const markup = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M3.11799 12.467C2.96099 12.176 2.96099 11.823 3.11799 11.532C5.00999 8.033 8.50499 5 12 5C15.495 5 18.99 8.033 20.882 11.533C21.039 11.824 21.039 12.177 20.882 12.468C18.99 15.967 15.495 19 12 19C8.50499 19 5.00999 15.967 3.11799 12.467Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M14.1213 9.87868C15.2929 11.0503 15.2929 12.9498 14.1213 14.1213C12.9497 15.2929 11.0502 15.2929 9.87865 14.1213C8.70708 12.9498 8.70708 11.0503 9.87865 9.87868C11.0502 8.70711 12.9497 8.70711 14.1213 9.87868Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
	`;

	return <SvgXml xml={markup} />;
}
