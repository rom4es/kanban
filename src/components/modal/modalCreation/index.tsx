import React from 'react';
import { ICard } from '../../../store/slices/kanban/types';
import CardForm from '../../cardForm';
import './styles.scss';

interface ModalCreationProps {
  onClose: () => void;
  card?: ICard | null;
  initialStatus?: number | null;
}

const ModalCreation: React.FC<ModalCreationProps> = (props) => {
  return (
    <>
      <h2 className="b-modal-title">
        {props.card ? 'Редактировать задачу' : 'Создать задачу'}
      </h2>
      <div className="b-modal-content">
        <CardForm {...props}></CardForm>
      </div>
    </>
  );
};

export default ModalCreation;
