import type { TreeNodeType } from "../types/tree.types";

export const updateNode = (
  tree: TreeNodeType[],
  id: string,
  cb: (node: TreeNodeType) => TreeNodeType
): TreeNodeType[] => {
  return tree.map((node) => {
    if (node.id === id) return cb(node);

    if (node.children) {
      return {
        ...node,
        children: updateNode(node.children, id, cb),
      };
    }

    return node;
  });
};

export const deleteNode = (
  tree: TreeNodeType[],
  id: string
): TreeNodeType[] => {
  return tree
    .filter((n) => n.id !== id)
    .map((n) => ({
      ...n,
      children: n.children
        ? deleteNode(n.children, id)
        : undefined,
    }));
};
