<script lang="ts">
	import { Tab, TabGroup, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
    import type { ActionData } from './$types';
	import Login from '$lib/User/Login.svelte';
	import Register from '$lib/User/Register.svelte';
    export let form: ActionData;

    if (form?.error){
        const toast: ToastSettings = {
            message: form?.error,
            timeout: 5000,
            background: 'variant-ghost-error',
        };
        toastStore.trigger(toast);
    }
    let tabSet = 0;

</script>

<svelte:head>
	<title>User Authentication</title>
	<meta name="acekavi Portfolio">
</svelte:head>

<div class="flex flex-row align-middle justify-center h-full">
    <div class="lg:mt-24">
        <TabGroup 
            justify="justify-center"
            active="variant-glass-primary"
            padding="px-20 py-2"
            rounded="false">
            <Tab bind:group={tabSet} name="tab1" value={0}>Login</Tab>
            <Tab bind:group={tabSet} name="tab2" value={1}>Register</Tab>
            <!-- Tab Panels --->
            <svelte:fragment slot="panel">
                {#if tabSet === 0}
                    <Login />
                {:else if tabSet === 1}
                    <Register />
                {/if}
            </svelte:fragment>
        </TabGroup>
    </div>
</div>