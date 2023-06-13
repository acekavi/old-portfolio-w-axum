<script lang ="ts">
    import type { PageData, ActionData } from './$types';
	import Login from "$lib/User/Login.svelte";
	import Register from "$lib/User/Register.svelte";
    import { Tab, TabGroup } from "@skeletonlabs/skeleton";

    let tabSet = 0;

    export let data: PageData;
    export let form: ActionData;
</script>

<div class="flex flex-row align-middle justify-center h-full">
    
        {#if form?.success}
        <!-- this message is ephemeral; it exists because the page was rendered in           response to a form submission. it will vanish if the user reloads -->    
        <p>Successfully logged in! Welcome back, {data.props?.token}</p>
        {/if}
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
                    <Login form/>
                {:else if tabSet === 1}
                    <Register />
                {/if}
            </svelte:fragment>
        </TabGroup>
    </div>
</div>