import React from 'react';
import { useAppDispatch } from '../../../hooks';
import { removeCard } from '../../../store/slices/kanban';
import { ICard } from '../../../store/slices/kanban/types';
import './styles.scss';

interface ModalRemoveProps {
  card: ICard | null;
  onClose: () => void;
}

const ModalRemove: React.FC<ModalRemoveProps> = ({ card, onClose }) => {
  const dispatch = useAppDispatch();

  const onRemoveCard = () => {
    if (card) {
      dispatch(removeCard({ cardId: card.id }));
      onClose();
    }
  };

  return (
    <>
      <h2 className="b-modal-title">Удалить запись</h2>
      <div className="b-modal-content">
        <p>Вы действительно хотите удалить задачу <b>«{card?.name}»</b>?</p>
        <div className="b-modal-remove-controls">
          <button className="b-btn" onClick={onRemoveCard}>
            Да
          </button>
          <button className="b-btn" onClick={onClose}>
            Нет
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalRemove;
