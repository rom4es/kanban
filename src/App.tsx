import React, { useState } from 'react';
import CardForm from './components/cardForm';
import Kanban from './components/kanban';
import Modal from './components/modal';
import { useAppDispatch, useAppSelector } from './hooks';
import { closeModal } from './store/slices/kanban';
import { ModalType } from './store/slices/kanban/types';

function App() {

  return (
    <div className="App">
      <Kanban></Kanban>
      <Modal></Modal>
    </div>
  );
}

export default App;
