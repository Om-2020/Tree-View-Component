import { useState } from "react";
import type { TreeNodeType } from "../types/tree.types";

interface Props {
  node: TreeNodeType;
  onToggle: (id: string) => void;
  onAdd: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}

export default function TreeNode({
  node,
  onToggle,
  onAdd,
  onDelete,
  onEdit,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(node.name);

  const avatarLetter =
    node.id === "1" ? "A" : node.name?.charAt(0)?.toUpperCase();

  return (
    <div className="tree-node">
      <div className="node-wrapper">
        <div
          className={`avatar ${
            node.id === "1" ? "avatar-blue" : "avatar-green"
          }`}
          onClick={() => onToggle(node.id)}
        >
          {avatarLetter}
        </div>

        {/* Card */}
        <div className="node-card">
          {editMode ? (
            <input
              className="edit-input"
              value={value}
              autoFocus
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => {
                onEdit(node.id, value);
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onEdit(node.id, value);
                  setEditMode(false);
                }
              }}
            />
          ) : (
            <span
              className="node-title"
              onDoubleClick={() => setEditMode(true)}
            >
              {node.name}
            </span>
          )}

          <button className="add-btn" onClick={() => onAdd(node.id)}>
            +
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(node.id)}
          >
            ×
          </button>
        </div>
      </div>

      {node.isExpanded && node.children && (
        <div className="children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onToggle={onToggle}
              onAdd={onAdd}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
