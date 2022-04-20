export interface KanbanState {
  statuses: IStatus[];
}

export interface IStatus {
  id: number;
  name: string;
  color: string;
  items: ICard[];
}

export interface ICard {
  id: number;
  name: string;
  decsription?: string;
  due?: string | null;
}
