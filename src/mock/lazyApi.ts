import type { TreeNodeType } from "../types/tree.types";

export const fetchLazyChildren = async (
  parentId: string
): Promise<TreeNodeType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: parentId + "-1",
          name: "Level A",
          children: [],
        },
        {
          id: parentId + "-2",
          name: "Level A",
          children: [],
        },
      ]);
    }, 800);
  });
};
