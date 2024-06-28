<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import ListItem from "./ListItem.svelte";
  import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
  import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
  import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

  let data = $state([
    { id: 1, label: "Item 1" },
    { id: 2, label: "Item 2" },
    { id: 3, label: "Item 3" },
    { id: 4, label: "Item 4" },
    { id: 5, label: "Item 5" },
    { id: 6, label: "Item 6" },
  ]);

  onMount(() => {
    return monitorForElements({
      canMonitor: () => true,
      onDrop: ({ location, source }) => {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const idxSource = data.findIndex((v) => v.id === source.data.id);
        const idxTarget = data.findIndex((v) => v.id === target.data.id);

        data = reorderWithEdge({
          list: data,
          startIndex: idxSource,
          indexOfTarget: idxTarget,
          closestEdgeOfTarget: extractClosestEdge(target.data),
          axis: "vertical",
        });
      },
    });
  });
</script>

<div class="container">
  {#each data as entry (entry.id)}
    <ListItem data={entry} gap={"0.5rem"}>
      <div class="item">
        {entry.label}
      </div>
    </ListItem>
  {/each}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 10rem;
  }

  .item {
    display: flex;
    height: 2rem;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    background-color: #1c1c1c;
  }
</style>
