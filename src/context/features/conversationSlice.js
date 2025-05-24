import { aiMockConversations, mockConversations } from '@/assets/mockData';
const { createSlice } = require('@reduxjs/toolkit');

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    customerConversations: mockConversations,
    aiConversations: aiMockConversations,
  },
  reducers: {
    addCustomerConversation: (state, action) => {
      state.customerConversations.push(action.payload);
    },
    addAiConversation: (state, action) => {
      state.aiConversations.push(action.payload);
    },
  },
});

export const { addCustomerConversation, addAiConversation } =
  conversationSlice.actions;
export const conversationReducer = conversationSlice.reducer;
