import React, { useEffect } from 'react';
import './styles.scss';
import closeIcon from '../../assets/images/icons/close.svg';
import ModalRemove from './modalRemove';
import { ModalType } from '../../store/slices/kanban/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeModal } from '../../store/slices/kanban';
import ModalCreation from './modalCreation';

interface ModalProps {}

const Modal: React.FC<ModalProps> = () => {
  const { activeModal } = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(closeModal());
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const GetModalContent = () => {
    switch (activeModal.type) {
      case ModalType.Creation:
        return (
          <ModalCreation
            onClose={onClose}
            card={activeModal.props.card}
            initialStatus={activeModal.props.initialStatus}
          ></ModalCreation>
        );
      case ModalType.Remove:
        return <ModalRemove onClose={onClose} card={activeModal.props.card}></ModalRemove>;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  return (
    <div className={`b-overlay ${activeModal.type ? 'show' : ''}`} onClick={onClose}>
      <div className="b-modal" onClick={(e) => e.stopPropagation()}>
        <button className="b-modal-close" onClick={onClose}>
          <img src={closeIcon} alt="" />
        </button>
        {GetModalContent()}
      </div>
    </div>
  );
};

export default Modal;
