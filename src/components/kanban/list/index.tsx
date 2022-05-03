import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { moveCard, showModal } from '../../../store/slices/kanban';
import { DueFilterType, IStatus, ModalType } from '../../../store/slices/kanban/types';
import KanbanCard from '../card';
import { ICardDnd } from '../types';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import './styles.scss';

dayjs.extend(isToday);

interface KanbanPropsProps {
  status: IStatus;
}

const KanbanList: React.FC<KanbanPropsProps> = ({ status }) => {
  const { dueFilter } = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: ICardDnd, monitor) => {
      if (!monitor.didDrop()) {
        dispatch(moveCard({ cardId: item.cardId, newStatusId: status.id }));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const items = status.items.filter((card) => {
    switch (dueFilter) {
      case DueFilterType.All:
        return true;
      case DueFilterType.Overdue:
        if (!card.due) return false;
        return dayjs(card.due).unix() < dayjs().startOf('day').unix();
      case DueFilterType.Today:
        if (!card.due) return false;
        return dayjs(card.due).isToday();
    }
  });

  return (
    <div
      className="b-kanban-list"
      ref={drop}
      style={{ backgroundColor: isOver ? '#f6f6f6' : '', borderColor: status.color }}
    >
      <div className="b-kanban-list-header" style={{ borderColor: status.color }}>
        {status.name} ({items.length})
      </div>
      <div
        className="b-kanban-list-add"
        style={{ backgroundColor: status.color }}
        onClick={() => dispatch(showModal({ type: ModalType.Creation, initialStatus: status.id }))}
      >
        +
      </div>
      <div className="b-kanban-list-items">
        {items.map((card) => (
          <KanbanCard card={card} statusId={status.id} key={card.id}></KanbanCard>
        ))}
      </div>
    </div>
  );
};

export default KanbanList;
