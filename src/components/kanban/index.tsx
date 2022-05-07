import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from '../../hooks';
import { IStatus } from '../../store/slices/kanban/types';
import DueFilter from '../dueFilter';
import KanbanList from './list';
import githubIcon from '../../assets/images/icons/github.svg';
import './styles.scss';

interface KanbanProps {}

const Kanban: React.FC<KanbanProps> = () => {
  const { statuses } = useAppSelector((state) => state.kanban);

  return (
    <div className="b-page">
      <div className="b-page-top">
        <h1>Kanban</h1>
        <a href="https://github.com/rom4es/kanban" target="_blank" rel="noopener noreferrer">
          <img src={githubIcon} alt="" />
        </a>
      </div>
      <DueFilter></DueFilter>
      <DndProvider backend={HTML5Backend}>
        <div className="b-kanban">
          {statuses.map((item: IStatus) => (
            <KanbanList status={item} key={item.id}></KanbanList>
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default Kanban;
