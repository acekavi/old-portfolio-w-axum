<script>
    // @ts-nocheck
	 export let form;
</script>

<div class="card variant-glass py-4 rounded-none">
    <section class="font-heading-token m-8">
        <form method="POST" action="?/login">
            <div class="border-b border-gray-500/10">
                <h2 class="text-base font-semibold leading-7">Login!</h2>
                <p class="mb-4 text-sm leading-6 text-neutral-500">
                    This is for spam protection <i class="fa-solid fa-triangle-exclamation" />
                </p>

                <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6">
                    <div class="col-span-full">
                        <label for="username" class="block mb-1 text-sm font-medium leading-6">Username or Email</label>
                        <div class="input-ring">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="g.host"
                                autocomplete="username"
                                class="focus-ring"
                                value={form?.username ?? ''}
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
                        <button type="submit" class="btn variant-glass-primary  mb-8">
                            <span>Login</span>
                            <span><i class="fa-solid fa-right-to-bracket" /></span></button
                        >
                    </div>
                </div>
            </div>
            
        {#if form?.error}
            <p class="error">{form.error}</p>
        {/if}
        </form>
    </section>

    <footer class="card-footer flex flex-row justify-evenly">
        <a href="/forgot-password" class="text-xs"><i class="fa-solid fa-key" /> Forgot Password?</a>
    </footer>
</div>