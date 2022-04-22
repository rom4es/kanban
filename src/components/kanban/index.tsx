import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from '../../hooks';
import Modal from '../modal';
import KanbanList from './list';
import './styles.scss';

interface KanbanProps {}

const Kanban: React.FC<KanbanProps> = () => {
  const { statuses } = useAppSelector((state) => state.kanban);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="b-kanban">
        {statuses.map((item) => (
          <KanbanList status={item} key={item.id}></KanbanList>
        ))}
      </div>
    </DndProvider>
  );
};

export default Kanban;
