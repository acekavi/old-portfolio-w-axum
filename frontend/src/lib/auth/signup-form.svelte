<script lang="ts">
	import { AlertTriangle, Loader2, XSquare, UserPlus, View, EyeOff } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { modalStore, toastStore } from '@skeletonlabs/skeleton';
	import { focusTrap } from '@skeletonlabs/skeleton';

	let isFocused: boolean = true;
	let isLoading = false;
	let password: HTMLInputElement;
	let confirmPassword: HTMLInputElement;

	function onClose(): void {
		modalStore.close();
	}
	function showPassword(): void {
		password.type = password.type === 'password' ? 'text' : 'password';
	}
	function showConPassword(): void {
		confirmPassword.type = confirmPassword.type === 'password' ? 'text' : 'password';
	}

	const loader: SubmitFunction = (input) => {
		isLoading = true;
		return async (options) => {
			if (options.result.status !== 200) {
				toastStore.trigger({
					message: options.result.data.error,
					timeout: 5000,
					background: 'variant-glass-error'
				});
			} else {
				toastStore.trigger({
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
							bind:this={password}
							class="input variant-form-material leading-5"
							title="Password"
							name="password"
							type="password"
							placeholder="●●●●●●●●●●●●"
							autocomplete="off"
						/>
						<button title="Show Password" on:click={showPassword} type="button">
							<EyeOff class="hover:text-success-600" />
						</button>
					</div>
				</label>

				<label class="label col-span-full">
					<span>Confirm Password</span>
					<div class="input-group input-group-divider grid-cols-[1fr_auto] variant-form-material">
						<input
							bind:this={confirmPassword}
							class="input variant-form-material leading-5"
							title="Confirm Password"
							name="confirm-password"
							type="password"
							placeholder="●●●●●●●●●●●●"
							autocomplete="off"
						/>
						<button title="Show Password" on:click={showConPassword} type="button">
							<EyeOff class="hover:text-success-600" />
						</button>
					</div>
				</label>

				<div class="col-span-full">
					<button on:click={onClose} class="btn variant-soft-error my-4 float-left">
						<span>Cancel</span>
						<span><XSquare stroke-width="1.25" size="18px" /></span>
					</button>
					<button type="submit" class="btn variant-soft-success my-4 float-right">
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
