import { configureStore } from '@reduxjs/toolkit';
import { layoutReducer } from './features/layoutSlice';
import { valueReducer } from './features/valueSlice';
import { conversationReducer } from './features/conversationSlice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    messageInput: valueReducer,
    conversation: conversationReducer,
  },
});
