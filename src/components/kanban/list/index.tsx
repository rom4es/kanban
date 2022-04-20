import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../../../hooks';
import { moveCard } from '../../../store/slices/kanban';
import { IStatus } from '../../../store/slices/kanban/types';
import KanbanCard from '../card';
import { ICardDnd } from '../types';
import './styles.scss';

interface KanbanPropsProps {
  status: IStatus;
}

const KanbanList: React.FC<KanbanPropsProps> = ({ status }) => {
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

  return (
    <div
      className="b-kanban-list"
      ref={drop}
      style={{ backgroundColor: isOver ? '#f5e1cf' : '', borderColor: status.color }}
    >
      <div className="b-kanban-list-header" style={{ borderColor: status.color }}>
        {status.name} ({status.items.length})
      </div>
      <div className="b-kanban-list-add" style={{ backgroundColor: status.color}}>
        +
      </div>
      <div className="b-kanban-list-items">
        {status.items.map((card) => (
          <KanbanCard card={card} statusId={status.id} key={card.id}></KanbanCard>
        ))}
      </div>
    </div>
  );
};

export default KanbanList;
