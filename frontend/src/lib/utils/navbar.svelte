<script lang="ts">
	import { LightSwitch, modalStore, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { UserCircle2 } from 'lucide-svelte';

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};

	function loginModal() {
		modalStore.trigger({ type: 'component', component: 'LoginModal' });
	}

	function signupModal() {
		modalStore.trigger({ type: 'component', component: 'SignupModal' });
	}

	function logoutModal() {
		modalStore.trigger({ type: 'component', component: 'LogoutModal' });
	}

	export let user: User;
</script>

<div class="lg:sticky lg:top-0 lg:left-0 lg:h-0 lg:p-0 z-50">
	<div class="flex justify-between text-zinc-900 dark:text-zinc-100 items-center">
		<div class="ms-16 lg:mt-8 p-4">
			<a href="/">
				<!-- <img
					src="https://ace-in-bucket2.s3.amazonaws.com/static/images/logo/Sign.png"
					alt="acekavi Logo"
					loading="lazy"
					class="h-8 invert dark:invert-0"
				/> -->
				<p
					class="lowercase text-2xl font-monospace dark:text-surface-100 text-surface-800 hover:text-primary-500 dark:hover:text-primary-500 ease-in-out transition-all duration-500"
				>
					ACEKAVI<span class="text-primary-500">.me</span>
				</p>
			</a>
		</div>

		<div class="me-16 flex justify-between gap-4 uppercase items-center lg:mt-8">
			<button
				class="hover:text-neutral-600 dark:hover:text-neutral-300 [&>*]:pointer-events-none"
				use:popup={popupClick}
			>
				<UserCircle2 size="20px" />
			</button>
			<a class="hover:text-neutral-600 dark:hover:text-neutral-300" href="/blog">Blog</a>
			<LightSwitch width="w-8" height="h-4" ring="variant-ghost-surface" />
		</div>
	</div>
</div>

<div class="card p-4 variant-glass-surface rounded-md" data-popup="popupClick">
	<p class="leading-6 border-b border-gray-500/50 pb-4 mb-4">User Authentication</p>
	{#if user}
		<button
			on:click={logoutModal}
			class="btn-sm font-semibold variant-soft block mx-auto mb-2 w-full rounded-md uppercase"
			>Logout</button
		>
		{#if user.is_superuser}
			<a
				href="/admin"
				class="btn-sm font-semibold variant-soft block mx-auto mb-2 w-full rounded-md uppercase text-center"
				>Admin</a
			>
		{/if}
	{:else}
		<button
			on:click={loginModal}
			class="btn-sm font-semibold variant-soft block mx-auto mb-2 w-full rounded-md uppercase"
			>Login</button
		>
		<button
			on:click={signupModal}
			class="btn-sm font-semibold variant-soft block mx-auto mb-2 w-full rounded-md uppercase"
			>SignUp</button
		>
	{/if}
	<div class="arrow variant-glass-surface" />
</div>
