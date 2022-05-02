import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, createTransform } from 'redux-persist';
import kanbanReducer from '../store/slices/kanban/';
import thunk from 'redux-thunk';
import { KanbanState } from './slices/kanban/types';

const reducers = combineReducers({
  kanban: kanbanReducer,
});

const SetTransform = createTransform(
  (inboundState: KanbanState, key) => {
    return {
      ...inboundState,
      activeModal: {
        type: null,
        props: {
          card: null,
          initialStatus: null,
        },
      },
    };
  },
  null,
  { whitelist: ['kanban'] }
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [SetTransform],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
