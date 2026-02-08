export interface TreeNodeType {
  id: string;
  name: string;
  children?: TreeNodeType[];
  isExpanded?: boolean;
  hasLazyChildren?: boolean;
}
