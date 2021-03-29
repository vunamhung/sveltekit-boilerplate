<script context='module'>
  export const load = ({ page }) => ({ props: { page } });
</script>
<script>
  import '../global.css';

  export let page;
</script>

<slot />
