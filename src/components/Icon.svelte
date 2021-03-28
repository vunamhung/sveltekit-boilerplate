<script>
  import feather from 'feather-icons';

  export const directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

  export let name;
  export let direction = 'n';
  export let strokeWidth;
  export let stroke;
  export let fill = false;
  export let width = '1em';
  export let height = '1em';

  $: icon = feather?.icons[name];
  $: rotation = directions.indexOf(direction) * 45;
  $: if (icon) {
    if (stroke) icon.attrs['stroke'] = stroke;
    if (fill) icon.attrs['fill'] = fill;
    if (strokeWidth) icon.attrs['stroke-width'] = strokeWidth;
  }
</script>

{#if icon}
  <svg {...icon.attrs} style="width: {width}; height: {height}; transform: rotate({rotation}deg);">
    <g>
      {@html icon.contents}
    </g>
  </svg>
{/if}
