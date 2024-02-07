export enum Status {
	WAITING = 'WAITING',
	IN_PRODUCTION = 'IN_PRODUCTION',
	DONE = 'DONE',
	FINISHED = 'FINISHED'
}

export const statusDisplayNames = {
	[Status.WAITING]: 'Aguardando',
	[Status.IN_PRODUCTION]: 'Entrou em Produção',
	[Status.DONE]: 'Pronto!',
	[Status.FINISHED]: 'Finalizado'
};

export const statusColorsBackground = {
	'DONE': 'rgba(48,215,135, 0.1)',
	'IN_PRODUCTION': 'rgba(215,108,48, 0.1)',
	'WAITING': 'rgba(61, 133, 198, 0.1)',
	'FINISHED': 'rgba(102, 102, 102, 0.1)'
};

export const statusColors = {
	'DONE': '#30D787',
	'IN_PRODUCTION': '#D76C30',
	'WAITING': '#3D85C6',
	'FINISHED': '#666666'
};
