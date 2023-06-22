<script lang="ts">
	import { UserPlus, AlertTriangle } from 'lucide-svelte';
	import type { ActionData } from '../../routes/user/$types';
	import { enhance } from '$app/forms';
	import LoadingSpinner from '$lib/Blog/LoadingSpinner.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	export let form: ActionData;
	let isLoading = false;

	const registerLoader: SubmitFunction = (input) => {
		isLoading = true;
		return async (options) => {
			isLoading = false;
			await options.update();
		};
	};
</script>

<div class="card variant-glass py-4 rounded-none">
	<section class="m-8">
		<form method="POST" action="?/register" use:enhance={registerLoader}>
			<p class="font-sans text-2xl font-semibold leading-7">Register!</p>
			<p class="mb-4 text-sm leading-6 text-neutral-500">
				This is for spam protection <AlertTriangle
					stroke-width="1.25"
					size="13px"
					class="inline leading-6"
				/>
			</p>

			<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
				<div class="col-span-full">
					<label for="username" class="block mb-1 text-sm font-medium leading-6">Username</label>
					<div class="input-ring">
						<input
							type="text"
							name="username"
							id="username"
							value={form?.username ?? ''}
							placeholder="g.host"
							autocomplete="username"
							class="focus-ring"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="email" class="block mb-1 text-sm font-medium leading-6">Email</label>
					<div class="input-ring">
						<input
							type="text"
							name="email"
							id="email"
							value={form?.email ?? ''}
							placeholder="ghost@proton.me"
							autocomplete="email"
							class="focus-ring"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="password" class="block mb-1 text-sm font-medium leading-6">Password</label>
					<div class="input-ring">
						<input
							type="password"
							name="password"
							id="password"
							value={form?.password ?? ''}
							placeholder="●●●●●●●●"
							class="focus-ring"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<label for="confirm-password" class="block mb-1 text-sm font-medium leading-6"
						>Confirm Password</label
					>
					<div class="input-ring">
						<input
							type="password"
							name="confirm-password"
							id="confirm-password"
							value={form?.confirm_password ?? ''}
							placeholder="●●●●●●●●"
							class="focus-ring"
						/>
					</div>
				</div>

				<div class="col-span-full">
					<button type="submit" class="btn variant-glass-primary mt-4">
						<span>Register</span>
						{#if isLoading}
							<LoadingSpinner />
						{:else}
							<span><UserPlus stroke-width="1.25" size="18px" /></span>
						{/if}
					</button>
				</div>
			</div>
		</form>
	</section>
</div>
