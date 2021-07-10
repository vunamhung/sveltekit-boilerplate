<script context='module'>
  export const load = ({ page }) => ({ props: { page } });
</script>
<script>
  import '../css/style.css';

  export let page;
</script>

<slot />
