import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

export function dropTarget(node: HTMLElement, param: any) {
  const destroy = dropTargetForElements({
    element: node,
    canDrop: (args) => {
      return args.source.element !== node;
    },
    getIsSticky: () => true,
    getData: ({ input, element }) => {
      let data = attachClosestEdge(param.data, {
        input,
        element,
        allowedEdges: ["top", "bottom"],
      });
      param.state.closestEdge = extractClosestEdge(data);
      return data;
    },
    onDragLeave: (args) => {
      param.state.closestEdge = null;
    },
    onDrop: (args) => {
      param.state.closestEdge = null;
    },
  });

  return { destroy };
}
