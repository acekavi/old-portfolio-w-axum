<script lang="ts">
	import { Tab, TabGroup, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';
	import Login from '$lib/User/Login.svelte';
	import Register from '$lib/User/Register.svelte';
	import { page } from '$app/stores';
	export let form: ActionData;
	export let data: PageData;
	export let user = data.user;

	if (user != undefined) {
		user.username = user?.username.charAt(0).toUpperCase() + user?.username.slice(1);
	}

	const register = $page.url.href.includes('register');
	let tabSet = register ? 1 : 0;

	if (form?.error) {
		const toast: ToastSettings = {
			message: form?.error,
			timeout: 5000,
			background: 'variant-glass-error'
		};
		toastStore.trigger(toast);
	}

	if (form?.success) {
		const toast: ToastSettings = {
			message: `Welcome ${user?.username}!`,
			timeout: 5000,
			background: 'variant-glass-success'
		};
		toastStore.trigger(toast);
	}
</script>

<svelte:head>
	<title>User Authentication</title>
	<meta
		name="description"
		content="User Authentication Page: Secure Access to the Blog and Protect Against Spam Users"
	/>
</svelte:head>

<div class="flex flex-row align-middle justify-center h-full">
	<div class="lg:mt-24">
		{#if data.error}
			<TabGroup
				justify="justify-center"
				active="variant-glass-primary"
				padding="px-20 py-2"
				rounded="false"
			>
				<Tab bind:group={tabSet} name="tab1" value={0}>Login</Tab>
				<Tab bind:group={tabSet} name="tab2" value={1}>Register</Tab>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					{#if tabSet === 0}
						<Login />
					{:else if tabSet === 1}
						<Register />
					{/if}
				</svelte:fragment>
			</TabGroup>
		{:else}
			<h1 class="text-3xl font-bold text-center">Welcome {user?.username}</h1>

			<form method="POST" action="?/logout" class="mx-auto">
				<button type="submit" class="btn btn-primary variant-glass-secondary rounded-md"
					>Logout</button
				>
			</form>
		{/if}
	</div>
</div>
