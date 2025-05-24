const { createSlice } = require('@reduxjs/toolkit');

const valueSlice = createSlice({
  name: 'messageInput',
  initialState: {
    //textarea
    sendMessageValue: null,
    aiSendMessageValue: null,

    //ai-panel:
    sendAiPanelMessageValue: null,
  },
  reducers: {
    setSendMessageValue: (state, action) => {
      state.sendMessageValue = action.payload;
    },
    setAiSendMessageValue: (state, action) => {
      state.aiSendMessageValue = action.payload;
    },
    setSendAiPanelMessageValue: (state, action) => {
      state.sendAiPanelMessageValue = action.payload;
    },
  },
});

export const {
  setSendMessageValue,
  setAiSendMessageValue,
  setSendAiPanelMessageValue,
} = valueSlice.actions;
export const valueReducer = valueSlice.reducer;
