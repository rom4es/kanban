import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { data } from './mocks';
import { DueFilterType, ICard, ICardData, IStatus, KanbanState, ModalType } from './types';
import { v4 as uuidv4 } from 'uuid';

const initialState: KanbanState = {
  statuses: data,
  dueFilter: DueFilterType.All,
  activeModal: {
    type: null,
    props: {
      card: null,
      initialStatus: null,
    },
  },
};

const getCardStatus = (statuses: IStatus[], cardId: string) => {
  return statuses.find((status) =>
    status.items.find((card) => {
      return card.id === cardId;
    })
  );
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    moveCard(
      state,
      action: PayloadAction<{
        cardId: string;
        newStatusId: number;
        hoverCard?: {
          cardId: string;
          insertBefore: boolean;
        } | null;
      }>
    ) {
      const { cardId, newStatusId, hoverCard } = action.payload;
      if (hoverCard && cardId === hoverCard.cardId) {
        return;
      }
      const oldStatus = getCardStatus(state.statuses, cardId);
      const newStatus = state.statuses.find((status) => status.id === newStatusId);
      if (oldStatus && newStatus) {
        const cardIndex = oldStatus.items.findIndex((card) => card.id === cardId);
        if (cardIndex > -1) {
          const [removedCard] = oldStatus.items.splice(cardIndex, 1);
          if (hoverCard) {
            const hoverCardIndex = newStatus.items.findIndex(
              (card) => card.id === hoverCard.cardId
            );
            if (hoverCardIndex > -1) {
              newStatus.items.splice(
                hoverCard.insertBefore ? hoverCardIndex : hoverCardIndex + 1,
                0,
                removedCard
              );
            }
          } else {
            newStatus.items.push(removedCard);
          }
        }
      }
    },
    showModal(
      state,
      action: PayloadAction<{ type: ModalType; card?: ICard; initialStatus?: number }>
    ) {
      state.activeModal.type = action.payload.type;
      state.activeModal.props.card = action.payload.card ? action.payload.card : null;
      state.activeModal.props.initialStatus = action.payload.initialStatus
        ? action.payload.initialStatus
        : null;
    },
    closeModal(state) {
      state.activeModal.type = null;
      state.activeModal.props.card = null;
      state.activeModal.props.initialStatus = null;
    },
    removeCard(state, action: PayloadAction<{ cardId: string }>) {
      state.statuses.forEach((status) =>
        status.items.forEach((card, index) => {
          if (card.id === action.payload.cardId) {
            status.items.splice(index, 1);
          }
        })
      );
    },
    addCard(state, action: PayloadAction<{ card: ICardData; statusId: number }>) {
      const status = state.statuses.find((status) => status.id === action.payload.statusId);
      if (status) {
        const card: ICard = {
          id: uuidv4(),
          ...action.payload.card,
        };
        status.items.push(card);
      }
    },
    editCard(state, action: PayloadAction<{ card: ICard; statusId: number }>) {
      state.statuses.forEach((status, statusIndex) =>
        status.items.forEach((item, itemIndex) => {
          if (item.id === action.payload.card.id) {
            state.statuses[statusIndex].items[itemIndex] = action.payload.card;
            if (action.payload.statusId !== state.statuses[statusIndex].id) {
              const moveCardAction = {
                payload: {
                  cardId: action.payload.card.id,
                  newStatusId: action.payload.statusId
                },
                type: 'kanban/moveCard'
              }
              kanbanSlice.caseReducers.moveCard(state, moveCardAction);
            }
          }
        })
      );
    },
    changeFilter(state, action: PayloadAction<{ newValue: DueFilterType }>) {
      state.dueFilter = action.payload.newValue;
    },
  },
  extraReducers: (builder) => {},
});

export const { moveCard, showModal, closeModal, removeCard, addCard, editCard, changeFilter } =
  kanbanSlice.actions;

export default kanbanSlice.reducer;
