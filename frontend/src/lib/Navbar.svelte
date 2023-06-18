<script lang="ts">
	import { LightSwitch, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { UserCircle2 } from 'lucide-svelte';

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'bottom'
	};
</script>

<div class="lg:sticky lg:top-0 lg:left-0 lg:h-0 lg:p-0 z-50">
	<div class="flex justify-between text-zinc-900 dark:text-zinc-100 items-center">
		<div class="ms-16 lg:mt-8 p-4">
			<a href="/">
				<img
					src="https://ace-in-bucket2.s3.amazonaws.com/static/images/logo/Sign.png"
					alt="acekavi Logo"
					loading="lazy"
					class="h-8 invert dark:invert-0"
				/>
			</a>
		</div>

		<div class="me-16 flex justify-between gap-4 uppercase items-center lg:mt-8">
			<a
				class="hover:text-neutral-600 dark:hover:text-neutral-300 [&>*]:pointer-events-none"
				href="/user"
				use:popup={popupHover}
			>
				<UserCircle2 size="20px" />
			</a>
			<a class="hover:text-neutral-600 dark:hover:text-neutral-300" href="/blog">Blog</a>
			<LightSwitch width="w-8" height="h-4" ring="variant-ghost-surface" />
		</div>
	</div>
</div>

<div class="card p-4 variant-glass-surface rounded-md" data-popup="popupHover">
	User Authentication
	<div class="arrow variant-glass-surface" />
</div>
