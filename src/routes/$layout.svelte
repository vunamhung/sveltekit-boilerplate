<script context="module">
  export const load = ({ page }) => ({ props: { page } });
</script>

<script>
  import '../style.css';

  export let page;
</script>

<slot />
