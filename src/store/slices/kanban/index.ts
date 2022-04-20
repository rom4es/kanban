import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { data } from './mocks';
import { IStatus, KanbanState } from './types';

const initialState: KanbanState = {
  statuses: data,
};

const getCardStatus = (statuses: IStatus[], cardId: number) => {
  return statuses.find((status) =>
    status.items.find((card) => {
      return card.id === cardId;
    })
  );
};

export const counterSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    moveCard(
      state,
      action: PayloadAction<{
        cardId: number;
        newStatusId: number;
        hoverCard?: {
          cardId: number;
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
  },
  extraReducers: (builder) => {},
});

export const { moveCard } = counterSlice.actions;

export default counterSlice.reducer;
