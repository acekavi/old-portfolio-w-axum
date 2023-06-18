<script>
	import { UserPlus, AlertTriangle } from 'lucide-svelte';
</script>

<div class="card variant-glass py-4 rounded-none">
	<section class="m-8">
		<form method="POST" action="?/register">
			<div class="border-b border-gray-500/10">
				<p class="font-sans text-2xl font-semibold leading-7">Register!</p>
				<p class="mb-4 text-sm leading-6 text-neutral-500">
					This is for spam protection <AlertTriangle
						stroke-width="1.25"
						size="0.75rem"
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
								placeholder="●●●●●●●●"
								class="focus-ring"
							/>
						</div>
					</div>

					<div class="col-span-full">
						<button type="submit" class="btn variant-glass-primary my-4">
							<span>Register</span>
							<span><UserPlus stroke-width="1.25" size="18" /></span></button
						>
					</div>
				</div>
			</div>
		</form>
	</section>
</div>
