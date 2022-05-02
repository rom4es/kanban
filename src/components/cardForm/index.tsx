import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './styles.scss';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { addCard, editCard } from '../../store/slices/kanban';
import { ICard } from '../../store/slices/kanban/types';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm, SubmitHandler } from 'react-hook-form';

interface CardFormProps {
  onClose: () => void;
  card?: ICard | null;
  initialStatus?: number | null;
}

const CardForm: React.FC<CardFormProps> = ({ onClose, initialStatus = null, card = null }) => {
  const { statuses } = useAppSelector((state) => state.kanban);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [name, setName] = useState(card ? card.name : '');
  const [description, setDescription] = useState(card ? card.description : '');
  const [dueDate, setDueDate] = useState<Date | null>(card && card.due ? new Date(card.due) : null);
  const [status, setStatus] = useState<number>(initialStatus ? initialStatus : statuses[0].id);

  const onSubmit = () => {
    if (card) {
      dispatch(
        editCard({
          card: {
            id: card.id,
            name,
            description,
            due: dueDate ? dueDate.toISOString() : null,
          },
          statusId: status,
        })
      );
    } else {
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
    }
    onClose();
  };

  return (
    <form className="b-card-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="b-form-row">
        <div className="b-input">
          <label>Название</label>
          <input
            {...register('name', { required: true })}
            className={errors.name ? 'error' : ''}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.exampleRequired && <span>This field is required</span>}
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
            minDate={new Date()}
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
        <button className="b-btn" type="submit">
          Сохранить
        </button>
        <button className="b-btn" onClick={onClose}>
          Отменить
        </button>
      </div>
    </form>
  );
};

export default CardForm;
