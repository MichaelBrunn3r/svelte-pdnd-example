<script lang="ts">
  import { dropTarget } from "../actions/dropTarget";
  import { draggable } from "../actions/draggable";
  import DropIndicator from "./DropIndicator.svelte";

  let { data, gap = "0px" } = $props();

  let _state = $state({
    dragged: false,
    closestEdge: null,
  });
</script>

<div
  class="container"
  class:opacity-40={_state.dragged}
  use:draggable={{ state: _state, data }}
  use:dropTarget={{
    state: _state,
    data,
  }}
>
  <!-- svelte-ignore slot_element_deprecated TODO: Replace with snippet once https://github.com/sveltejs/svelte/issues/12177 is resolved -->
  <slot></slot>
  <DropIndicator {gap} closestEdge={_state.closestEdge} />
</div>

<style lang="scss">
  .container {
    position: relative;
    cursor: pointer;
  }

  .opacity-40 {
    opacity: 0.4;
  }
</style>
