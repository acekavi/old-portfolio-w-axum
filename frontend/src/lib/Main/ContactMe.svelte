<script lang="ts">
	import { enhance } from '$app/forms';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import {
		Linkedin,
		Github,
		Instagram,
		Twitter,
		FileHeart,
		Mail,
		Send,
		Loader2
	} from 'lucide-svelte';

	let isLoading = false;
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
			}
			isLoading = false;
			await options.update();
		};
	};

	function downloadFile() {
		const link = document.createElement('a');
		link.href = '/avishka_kavinda.pdf';
		link.download = 'Avishka Kavinda.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<div
	class="container my-auto flex items-center justify-evenly lg:flex-row flex-col-reverse lg:justify-center snap-always snap-center lg:h-screen gap-x-32 gap-y-16"
>
	<div class="flex flex-col justify-center items-center">
		<p class="text-8xl font-serif gradient-connect font-semibold border-b border-gray-500/10 pb-12">
			Let's Connect!
		</p>
		<div class="flex flex-row justify-evenly pb-8 pt-16 gap-8">
			<a target="_blank" href="https://www.twitter.com/acekavi" class="btn-icon variant-ringed"
				><Twitter stroke-width="1.25" size="18" /></a
			>
			<a target="_blank" href="https://www.linkedin.com/in/acekavi" class="btn-icon variant-ringed"
				><Linkedin stroke-width="1.25" size="18" /></a
			>
			<a target="_blank" href="https://www.behance.net/acekavi" class="btn-icon variant-ringed"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					stroke="1.25px"
					class="fill-surface-800 dark:fill-surface-200"
					viewBox="0 0 576 512"
					><path
						d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"
					/></svg
				></a
			>
			<a target="_blank" href="https://www.instagram.com/acekavi" class="btn-icon variant-ringed"
				><Instagram stroke-width="1.25" size="18" /></a
			>
			<a target="_blank" href="https://github.com/acekavi" class="btn-icon variant-ringed"
				><Github stroke-width="1.25" size="18" /></a
			>
		</div>
	</div>

	<div class="card variant-glass py-4 lg:w-auto w-4/5">
		<section class="mx-8 my-4">
			<form method="POST" action="?/reachOut" use:enhance={loader}>
				<p class="font-sans text-2xl font-semibold leading-7">Lets work together!</p>
				<p class="mb-4 text-sm leading-6 text-neutral-500">
					Reach out to me <Mail stroke-width="1.25" size="0.75rem" class="inline leading-6" />
				</p>

				<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
					<label class="label col-span-full">
						<span>Name</span>
						<input
							class="input variant-form-material leading-5"
							title="Name"
							name="name"
							type="text"
							placeholder="g.host"
							autocomplete="off"
						/>
					</label>

					<label class="label col-span-full">
						<span>Subject</span>
						<input
							class="input variant-form-material leading-5"
							title="Subject"
							name="subject"
							type="text"
							placeholder="Work with me"
							autocomplete="off"
						/>
					</label>

					<label class="label col-span-full">
						<span>Email address</span>
						<input
							class="input variant-form-material leading-5"
							title="Email address"
							name="email"
							type="email"
							placeholder="g.host@gmail.com"
							autocomplete="off"
						/>
					</label>

					<label class="label col-span-full">
						<span>Linkedin</span>
						<div
							class="input-group input-group-divider grid-cols-[auto_1fr_auto] variant-form-material leading-5"
						>
							<div class="input-group-shim">https://www.linkedin.com/in/</div>
							<input
								class="input rounded-none leading-5"
								title="Linkedin username"
								name="linkedin"
								type="text"
								placeholder="g.host"
								autocomplete="off"
							/>
						</div>
					</label>

					<label class="label col-span-full">
						<span>Message</span>
						<textarea
							class="textarea variant-form-material leading-5 resize-none"
							name="message"
							rows="4"
							placeholder="Let's work together on ..."
						/>
					</label>

					<div class="col-span-full">
						<button
							type="submit"
							class="btn btn-sm variant-ghost-surface my-4 float-left"
							on:click|preventDefault={downloadFile}
						>
							<span>Resume</span>
							<span><FileHeart stroke-width="1.25" size="18px" /></span>
						</button>

						<button type="submit" class="btn btn-sm variant-filled my-4 float-right">
							<span>Send</span>
							{#if isLoading}
								<Loader2 class="animate-spin" />
							{:else}
								<span><Send stroke-width="1.25" size="18px" /></span>
							{/if}
						</button>
					</div>
				</div>
			</form>
		</section>
	</div>
</div>

<style lang="postcss">
	.gradient-connect {
		@apply bg-clip-text text-transparent box-decoration-clone;
		/* Direction */
		@apply bg-gradient-to-bl;
		/* Color Stops */
		@apply from-tertiary-900 from-0% via-tertiary-700 via-40% to-tertiary-800 to-90%;
	}
</style>
