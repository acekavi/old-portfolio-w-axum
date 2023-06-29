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

type Options = {
	message: string;
	error: string;
};

export function toastTrigger(status: number, data: Options) {
	if (status !== 200) {
		toastStore.trigger({
			// @ts-ignore
			message: data.error,
			timeout: 5000,
			background: 'variant-glass-error'
		});
	} else {
		toastStore.trigger({
			// @ts-ignore
			message: data.message,
			timeout: 5000,
			background: 'variant-glass-success'
		});
	}
}