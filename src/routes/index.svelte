<script>
  import SvelteSeo from 'svelte-seo';
  import Counter from '$lib/Counter.svelte';
</script>

<SvelteSeo title="Home" />

<main class="text-center container">
  <h1 class="text-red-600 font-thin text-6xl my-16 uppercase">Hello world!</h1>
  <Counter />
  <p class="mt-8">Visit <a class="text-red-600 hover:underline" href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte apps.</p>
</main>
