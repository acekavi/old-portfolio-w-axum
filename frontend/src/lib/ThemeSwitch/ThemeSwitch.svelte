<div>
    <input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
    <label for="theme-toggle">
        <span class="hover:animate-ping inline-block w-5 h-5 rounded-full duration-300 bg-amber-400 dark:bg-slate-50" />
    </label>
</div>

<script lang="ts">
    import { browser } from '$app/environment';
    let darkMode = true;
    function handleSwitchDarkMode() {
        darkMode = !darkMode;
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        darkMode
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark');
    }

    if (browser) {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            darkMode = true;
        } else {
            document.documentElement.classList.remove('dark');
            darkMode = false;
        }
    }
</script>

<!-- Styles... -->
<style lang="postcss">
    #theme-toggle {
        @apply invisible;
    }

    #theme-toggle + label {
        @apply inline-block cursor-pointer w-5 h-5 rounded-full duration-300;
    }

    #theme-toggle:not(:checked) + label {
        @apply bg-amber-400;
    }

    #theme-toggle:checked + label {
        @apply bg-transparent;
        box-shadow: inset -7px -6px #ddd;
    }
</style>