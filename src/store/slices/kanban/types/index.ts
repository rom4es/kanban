export enum ModalType {
  Remove = 'remove',
  Creation = 'creation',
}

export enum DueFilterType {
  All = 'all',
  Overdue = 'overdue',
  Today = 'today'
}

export interface KanbanState {
  statuses: IStatus[];
  dueFilter: DueFilterType;
  activeModal: {
    type: ModalType | null;
    props: {
      card: ICard | null;
      initialStatus: number | null;
    }
  };
}

export interface IStatus {
  id: number;
  name: string;
  color: string;
  items: ICard[];
}

export interface ICardData {
  name: string;
  description: string;
  due: string | null;
}

export interface ICard extends ICardData{
  id: string;
}
