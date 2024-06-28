import { draggable as mkDraggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export type DraggableState = { dragged: boolean };
export type BaseDraggableData = { instanceId: symbol };

export function draggable(node: HTMLElement, param: any) {
  let destroy = mkDraggable({
    element: node,
    getInitialData: () => {
      return param.data;
    },
    onDragStart: (args) => {
      param.state.dragged = true;
    },
    onDrop: (args) => {
      param.state.dragged = false;
    },
  });

  return {
    destroy,
  };
}
