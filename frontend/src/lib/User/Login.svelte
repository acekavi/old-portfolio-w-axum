<script lang="ts">
	import { LogIn, AlertTriangle } from 'lucide-svelte';
	import type { ActionData } from '../../routes/user/$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import LoadingSpinner from '$lib/Blog/LoadingSpinner.svelte';
	export let form: ActionData;

	let isLoading = false;

	const loginLoader: SubmitFunction = (input) => {
		isLoading = true;
		return async (options) => {
			isLoading = false;
			await options.update();
		};
	};
</script>

<div class="card variant-glass py-4 rounded-none">
	<section class="m-8">
		<form method="POST" action="?/login" use:enhance={loginLoader}>
			<div class="border-b border-gray-500/10">
				<p class="font-sans text-2xl font-semibold leading-7">Login!</p>
				<p class="mb-4 text-sm leading-6 text-neutral-500">
					This is for spam protection <AlertTriangle
						stroke-width="1.25"
						size="13px"
						class="inline leading-6"
					/>
				</p>

				<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
					<div class="col-span-full">
						<label for="username" class="block mb-1 text-sm font-medium leading-6"
							>Username or Email</label
						>
						<div class="input-ring">
							<input
								type="text"
								name="username"
								id="username"
								placeholder="g.host"
								value={form?.username ?? ''}
								class="focus-ring"
							/>
						</div>
					</div>

					<div class="col-span-full">
						<label for="password" class="block text-sm font-medium mb-1 leading-6">Password</label>
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
						<button type="submit" class="btn variant-glass-primary my-4">
							<span>Login</span>
							{#if isLoading}
								<LoadingSpinner />
							{:else}
								<span><LogIn stroke-width="1.25" size="18px" /></span>
							{/if}
						</button>
					</div>
				</div>
			</div>
		</form>
	</section>

	<footer class="card-footer flex flex-row justify-evenly">
		<a href="/user/forgot-password" class="text-xs"
			><i class="fa-solid fa-key" /> Forgot Password?</a
		>
	</footer>
</div>
