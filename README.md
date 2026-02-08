# 🌳 Tree View Component — React + TypeScript

A **production-ready Tree View UI component** built using **React + TypeScript**, featuring recursive tree rendering, lazy loading, inline editing, and pixel-perfect hierarchical UI with connector lines.

This project demonstrates real-world frontend engineering concepts such as immutable state updates, recursive data structures, async loading, and reusable component architecture.

---

## 🚀 Live Features

✅ Expand / Collapse Nodes  
✅ Lazy Loading (Simulated Async API)  
✅ Add Child Nodes  
✅ Delete Nodes (Deletes Subtree)  
✅ Inline Node Name Editing (Double Click → Edit → Enter/Blur Save)  
✅ Dynamic Avatar Generation  
✅ Pixel Perfect Tree Connector Lines (Dotted Vertical + Elbow Connectors)  
✅ Recursive Tree Rendering  
✅ Immutable State Updates  
✅ Fully Responsive (Mobile + Tablet + Desktop)

---

## 🧠 Architecture Highlights

- Tree stored as recursive node structure  
- Utility-driven tree updates (updateNode, deleteNode)  
- Async lazy loading simulation using mock API  
- Component-driven scalable structure  
- CSS pseudo-elements used for connector lines (no extra DOM nodes)

---

## 🛠 Tech Stack

- React
- TypeScript
- CSS (Custom — No UI Library)
- Recursive Data Structures
- Functional State Updates

---

## 📂 Project Structure

├ components
│ ├ TreeNode.tsx
│ ├ TreeView.tsx
├ types
│ ├ tree.types.ts
├ utils
│ ├ tree.utils.ts
├ mock
│ ├ lazyApi.ts
├ styles
│ ├ tree.css
├ App.tsx


## 📦 Installation

```bash
git clone <repo-url>
cd treeviewQ1
npm install
npm run dev
