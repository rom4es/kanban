import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { ICard, ModalType } from '../../../store/slices/kanban/types';
import './styles.scss';
import editIcon from '../../../assets/images/icons/edit.svg';
import deleteIcon from '../../../assets/images/icons/close.svg';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { useAppDispatch } from '../../../hooks';
import { ICardDnd } from '../types';
import { moveCard, showModal } from '../../../store/slices/kanban';

interface KanbanCardProps {
  card: ICard;
  statusId: number;
}

enum HoverPosition {
  Top = 'top',
  Bottom = 'bottom',
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card, statusId }) => {
  const dispatch = useAppDispatch();
  const wrapperCardRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hoverTop, setHoverTop] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { cardId: card.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    hover: (item: ICardDnd, monitor) => {
      const hoverPosition = getHoverPosition(item, monitor);
      if (hoverPosition) {
        setHoverTop(hoverPosition === HoverPosition.Top);
      }
    },
    drop: (item: ICardDnd, monitor) => {
      if (!monitor.didDrop()) {
        const hoverPosition = getHoverPosition(item, monitor);
        if (hoverPosition) {
          dispatch(
            moveCard({
              cardId: item.cardId,
              newStatusId: statusId,
              hoverCard: { cardId: card.id, insertBefore: hoverPosition === HoverPosition.Top },
            })
          );
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getHoverPosition = (item: ICardDnd, monitor: DropTargetMonitor) => {
    if (!wrapperCardRef.current) {
      return null;
    }
    const dragId = item.cardId;
    const hoverId = card.id;
    if (dragId === hoverId) {
      return null;
    }
    const hoverBoundingRect = wrapperCardRef.current?.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

    return hoverClientY < hoverMiddleY ? HoverPosition.Top : HoverPosition.Bottom;
  };

  drag(cardRef);
  drop(wrapperCardRef);

  return (
    <div
      className="b-kanban-card-wrapper"
      ref={wrapperCardRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="b-kanban-card" ref={cardRef}>
        <div className="b-kanban-card-controls">
          <button
            className="edit"
            onClick={() =>
              dispatch(showModal({ type: ModalType.Creation, card: card, initialStatus: statusId }))
            }
          >
            <img src={editIcon} alt="" />
          </button>
          <button
            className="delete"
            onClick={() => dispatch(showModal({ type: ModalType.Remove, card: card }))}
          >
            <img src={deleteIcon} alt="" />
          </button>
        </div>
        <div className="b-kanban-card-name">{card.name}</div>
        <div className="b-kanban-card-descr">{card.description}</div>
        <div className="b-kanban-card-due">
          {card.due ? dayjs(card.due).format('DD.MM.YYYY') : ''}
        </div>
      </div>
      {isOver && !isDragging ? (
        <div className={`b-kanban-insert ${hoverTop ? 'before' : ''}`}></div>
      ) : (
        ''
      )}
    </div>
  );
};

export default KanbanCard;
