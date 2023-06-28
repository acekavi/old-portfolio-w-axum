<script lang="ts">
	import { AlertTriangle, Loader2, UserPlus, Eye } from 'lucide-svelte';
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
		<header class="text-5xl font-semibold uppercase font-serif">Sign up</header>
		<article class="border-b pb-4 mb-5 border-gray-500/50">
			This is for spam protection <AlertTriangle
				stroke-width="1.25"
				size="13px"
				class="inline leading-6"
			/>
		</article>
		<!-- Enable for debugging: -->
		<form method="POST" action="/auth?/register" use:enhance={loader} use:focusTrap={isFocused}>
			<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
				<label class="label col-span-full">
					<span>Username</span>
					<input
						class="input variant-form-material leading-5"
						title="Username"
						name="username"
						type="text"
						placeholder="g.host"
						autocomplete="off"
					/>
				</label>

				<label class="label col-span-full">
					<span>Email</span>
					<input
						class="input variant-form-material leading-5"
						title="Email"
						name="email"
						type="email"
						placeholder="ghost@proton.me"
						autocomplete="off"
					/>
				</label>

				<label class="label col-span-full">
					<span>Password</span>
					<div class="input-group input-group-divider grid-cols-[1fr_auto] variant-form-material">
						<input
							class="input variant-form-material leading-5"
							title="Password"
							name="password"
							type="password"
							placeholder="●●●●●●●●●●●●"
							autocomplete="off"
						/>
						<button
							title="Show Password"
							on:click={(event) => {
								// @ts-ignore
								const closestInput = event.target?.closest('div').querySelector('input');
								if (closestInput.type === 'password') {
									closestInput.type = 'text';
								} else {
									closestInput.type = 'password';
								}
							}}
							type="button"
						>
							<Eye class="hover:text-success-600" />
						</button>
					</div>
				</label>

				<label class="label col-span-full">
					<span>Confirm Password</span>
					<div class="input-group input-group-divider grid-cols-[1fr_auto] variant-form-material">
						<input
							class="input variant-form-material leading-5"
							title="Confirm Password"
							name="confirm-password"
							type="password"
							placeholder="●●●●●●●●●●●●"
							autocomplete="off"
						/>
						<button
							title="Show Password"
							on:click={(event) => {
								// @ts-ignore
								const closestInput = event.target?.closest('div').querySelector('input');
								if (closestInput.type === 'password') {
									closestInput.type = 'text';
								} else {
									closestInput.type = 'password';
								}
							}}
							type="button"
						>
							<Eye class="hover:text-success-600" />
						</button>
					</div>
				</label>

				<div class="col-span-full">
					<button on:click={onClose} class="btn variant-ghost-surface my-4 float-left">
						<span>Cancel</span>
					</button>
					<button type="submit" class="btn variant-filled my-4 float-right">
						<span>Register</span>
						{#if isLoading}
							<Loader2 class="animate-spin " />
						{:else}
							<span><UserPlus stroke-width="1.25" size="18px" /></span>
						{/if}
					</button>
				</div>
			</div>
		</form>
	</div>
{/if}
