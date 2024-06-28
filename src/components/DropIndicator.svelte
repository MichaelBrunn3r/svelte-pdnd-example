<script context='module' lang='ts'>
  import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/types";

  const enum Orientation {
    HORIZONTAL = "h",
    VERTICAL = "v",
  }

  const edgeToOrientation: Record<Edge, Orientation> = {
    top: Orientation.HORIZONTAL,
    bottom: Orientation.HORIZONTAL,
    left: Orientation.VERTICAL,
    right: Orientation.VERTICAL,
  } as const;
</script>

<script lang="ts">
  let { closestEdge, gap }: { closestEdge: Edge | null; gap: string } = $props();
</script>

<div
  data-edge={closestEdge}
  data-orientation={edgeToOrientation[closestEdge!]}
  style={`--gap: ${gap}`}
></div>

<style lang="scss">
  div {
    $terminal-size: 8px;
    $thickness: 2px;
    $line-offset: calc(-0.5 * (var(--gap) + $thickness));
    $terminal-radius: $terminal-size / 2;
    $offset-terminal-to-align-with-line: ($thickness - $terminal-size) / 2;

    display: none;
    position: absolute;
    z-index: 10;

    color: rgb(82, 82, 185);
    background-color: currentColor;
    pointer-events: none;

    &::before {
      position: absolute;
      width: $terminal-size;
      height: $terminal-size;

      content: "";
      box-sizing: border-box;
      border: 2px solid currentColor;
      border-radius: 50%;
    }

    &[data-orientation="h"] {
      height: $thickness;
      left: $terminal-radius;
      right: 0px;

      &::before {
        left: -$terminal-size;
      }
    }

    &[data-orientation="v"] {
      width: $thickness;
      top: $terminal-radius;
      bottom: 0;

      &::before {
        top: -$terminal-size;
      }
    }

    &[data-edge] {
      display: block;
    }

    &[data-edge="top"] {
      top: $line-offset;
      &::before {
        top: $offset-terminal-to-align-with-line;
      }
    }

    &[data-edge="bottom"] {
      bottom: $line-offset;
      &::before {
        bottom: $offset-terminal-to-align-with-line;
      }
    }

    &[data-edge="left"] {
      left: $line-offset;
      &::before {
        left: $offset-terminal-to-align-with-line;
      }
    }

    &[data-edge="right"] {
      right: $line-offset;
      &::before {
        right: $offset-terminal-to-align-with-line;
      }
    }
  }
</style>
