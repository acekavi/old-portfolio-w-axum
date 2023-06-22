<script lang="ts">
	import { Tab, TabGroup, toastStore } from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';
	import Login from '$lib/User/Login.svelte';
	import Register from '$lib/User/Register.svelte';
	import { page } from '$app/stores';
	export let form: ActionData;

	const register = $page.url.href.includes('register');
	let tabSet = register ? 1 : 0;
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
		<span class="hidden">
			{#if form?.error}
				{toastStore.trigger({
					message: form?.error,
					timeout: 5000,
					background: 'variant-glass-error'
				})}
			{/if}
		</span>
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
					<Login {form} />
				{:else if tabSet === 1}
					<Register {form} />
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
