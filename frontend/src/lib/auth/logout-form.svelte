<script lang="ts">
	import { AlertTriangle, Loader2, XSquare, UserPlus, View, EyeOff, LogOut } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { modalStore, toastStore } from '@skeletonlabs/skeleton';

	let isLoading = false;

	function onClose(): void {
		modalStore.close();
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
		<header class="text-5xl font-semibold uppercase font-serif">Log out</header>
		<article class="border-b pb-4 mb-5 border-gray-500/50 text-2xl">
			Are you sure you want to logout? <AlertTriangle
				stroke-width="1.25"
				size="20px"
				class="inline leading-6 text-warning-500"
			/>
		</article>
		<!-- Enable for debugging: -->
		<form method="POST" action="/auth?/logout" use:enhance={loader}>
			<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
				<div class="col-span-full">
					<button on:click={onClose} class="btn variant-soft-error my-4 float-left">
						<span>Cancel</span>
						<span><XSquare stroke-width="1.25" size="18px" /></span>
					</button>
					<button type="submit" class="btn variant-soft-success my-4 float-right">
						<span>Logout</span>
						{#if isLoading}
							<Loader2 class="animate-spin " />
						{:else}
							<span><LogOut stroke-width="1.25" size="18px" /></span>
						{/if}
					</button>
				</div>
			</div>
		</form>
	</div>
{/if}
