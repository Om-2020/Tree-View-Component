import { useState } from "react";
import TreeNode from "./TreeNode";
import type { TreeNodeType } from "../types/tree.types";
import { updateNode, deleteNode } from "../utils/tree.utils";
import { fetchLazyChildren } from "../mock/lazyApi";

const initialData: TreeNodeType[] = [
  {
    id: "1",
    name: "Level A",
    isExpanded: true,
    hasLazyChildren: true,
    children: [],
  },
];

const findNode = (
  nodes: TreeNodeType[],
  id: string
): TreeNodeType | null => {
  for (const node of nodes) {
    if (node.id === id) return node;

    if (node.children?.length) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export default function TreeView() {
  const [tree, setTree] = useState<TreeNodeType[]>(initialData);

  const toggle = async (id: string) => {
    const target = findNode(tree, id);

    if (!target) return;

    if (target.hasLazyChildren && !target.children?.length) {
      const children = await fetchLazyChildren(id);

      setTree((prev) =>
        updateNode(prev, id, (node) => ({
          ...node,
          children,
          isExpanded: true,
        }))
      );
    } else {
      setTree((prev) =>
        updateNode(prev, id, (node) => ({
          ...node,
          isExpanded: !node.isExpanded,
        }))
      );
    }
  };

  const addNode = (parentId: string) => {
    const name = prompt("Enter node name");
    if (!name) return;

    const newNode: TreeNodeType = {
      id: Date.now().toString(),
      name,
      children: [],
    };

    setTree((prev) =>
      updateNode(prev, parentId, (node) => ({
        ...node,
        children: [...(node.children || []), newNode],
        isExpanded: true,
      }))
    );
  };

  const removeNode = (id: string) => {
    if (!confirm("Delete node?")) return;
    setTree((prev) => deleteNode(prev, id));
  };

  const editNode = (id: string, name: string) => {
    setTree((prev) =>
      updateNode(prev, id, (node) => ({
        ...node,
        name,
      }))
    );
  };

  return (
    <div className="tree-root">
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onToggle={toggle}
          onAdd={addNode}
          onDelete={removeNode}
          onEdit={editNode}
        />
      ))}
    </div>
  );
}
