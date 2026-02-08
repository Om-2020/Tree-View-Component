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

export default function TreeView() {
  const [tree, setTree] = useState<TreeNodeType[]>(initialData);

  const toggle = async (id: string) => {
    let target: TreeNodeType | null = null;

    const find = (nodes: TreeNodeType[]) => {
      nodes.forEach((n) => {
        if (n.id === id) target = n;
        if (n.children) find(n.children);
      });
    };

    find(tree);

    if (target?.hasLazyChildren && !target.children?.length) {
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
