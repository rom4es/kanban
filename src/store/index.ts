import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import kanbanReducer from '../store/slices/kanban/';

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
