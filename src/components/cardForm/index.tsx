import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './styles.scss';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { addCard } from '../../store/slices/kanban';
import { ICard } from '../../store/slices/kanban/types';
import TextareaAutosize from 'react-textarea-autosize';

interface CardFormProps {
  onClose: () => void;
  card?: ICard | null;
  initialStatus?: number | null;
}

const CardForm: React.FC<CardFormProps> = ({ onClose, initialStatus = null, card = null }) => {
  const { statuses } = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(card ? card.name : '');
  const [description, setDescription] = useState(card ? card.description : '');
  const [dueDate, setDueDate] = useState<Date | null>(card && card.due ? new Date(card.due) : null);
  const [status, setStatus] = useState<number>(initialStatus ? initialStatus : statuses[0].id);

  const onSave = () => {
    dispatch(
      addCard({
        card: {
          name,
          description,
          due: dueDate ? dueDate.toISOString() : null,
        },
        statusId: status,
      })
    );
    onClose();
  };

  return (
    <div className="b-card-form">
      <div className="b-form-row">
        <div className="b-input">
          <label>Имя</label>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className="b-form-row">
        <div className="b-input">
          <label>Описание</label>
          <TextareaAutosize
            name="decrfiption"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxRows={10}
          />
        </div>
      </div>
      <div className="b-form-row">
        <div className="b-input b-datepicker">
          <label>Срок</label>
          <DatePicker
            selected={dueDate}
            onChange={(date: Date) => setDueDate(date)}
            dateFormat="dd.MM.yyyy"
            calendarStartDay={1}
          />
        </div>
        <div className="b-select">
          <label>Статус</label>
          <select
            defaultValue={status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setStatus(Number(e.target.value))
            }
          >
            {statuses.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="b-form-controls">
        <button className="b-btn" onClick={onSave}>
          Сохранить
        </button>
        <button className="b-btn" onClick={onClose}>
          Отменить
        </button>
      </div>
    </div>
  );
};

export default CardForm;
