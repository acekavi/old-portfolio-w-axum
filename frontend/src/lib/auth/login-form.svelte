<script lang="ts">
	import { LogIn, AlertTriangle, Loader2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { modalStore, toastStore } from '@skeletonlabs/skeleton';
	import { focusTrap } from '@skeletonlabs/skeleton';

	$: isFocused = true;
	$: isLoading = false;

	function onClose(): void {
		modalStore.close();
	}

	const loader: SubmitFunction = (input) => {
		isLoading = true;
		return async (options) => {
			if (options.result.status !== 200) {
				toastStore.trigger({
					// @ts-ignore
					message: options.result.data.error,
					timeout: 5000,
					background: 'variant-glass-error'
				});
			} else {
				toastStore.trigger({
					// @ts-ignore
					message: options.result.data.message,
					timeout: 5000,
					background: 'variant-glass-success'
				});
				modalStore.close();
			}
			isLoading = false;
			await options.update();
		};
	};
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4 rounded-none">
		<header class="text-5xl font-semibold uppercase font-serif">Login</header>
		<article class="border-b pb-4 mb-5 border-gray-500/50">
			This is for spam protection <AlertTriangle
				stroke-width="1.25"
				size="13px"
				class="inline leading-6"
			/>
		</article>
		<!-- Enable for debugging: -->
		<form method="POST" action="/auth?/login" use:enhance={loader} use:focusTrap={isFocused}>
			<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
				<label class="label col-span-full">
					<span>Username or Email</span>
					<input
						class="input variant-form-material leading-5"
						title="Username or Email"
						name="username"
						type="text"
						placeholder="g.host"
						autocomplete="off"
					/>
				</label>

				<label class="label col-span-full">
					<span>Password</span>
					<input
						class="input variant-form-material leading-5"
						title="Password"
						name="password"
						type="password"
						placeholder="●●●●●●●●"
						autocomplete="off"
					/>
				</label>

				<button
					class="col-span-full text-right"
					on:click|preventDefault={() => {
						toastStore.trigger({
							// @ts-ignore
							message: 'Please try to remember it 😂',
							timeout: 4000,
							background: 'variant-glass-primary'
						});
					}}>Forgot password?</button
				>

				<div class="col-span-full">
					<button on:click={onClose} class="btn variant-ghost-surface my-4 float-left">
						<span>Cancel</span>
					</button>
					<button type="submit" class="btn variant-filled my-4 float-right">
						<span>Login</span>
						{#if isLoading}
							<Loader2 class="animate-spin" />
						{:else}
							<span><LogIn stroke-width="1.25" size="18px" /></span>
						{/if}
					</button>
				</div>
			</div>
		</form>
	</div>
{/if}
