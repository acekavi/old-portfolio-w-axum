import { toastStore } from '@skeletonlabs/skeleton';

export function formatDate(epochTime: any) {
	const date = new Date(epochTime * 1000);
	return date.toLocaleDateString('en-GB', { timeZone: 'UTC', dateStyle: 'long' });
}

export function capitalize(str: string) {
	if (str != undefined) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	return str;
}

export async function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};