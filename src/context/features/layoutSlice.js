import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    showLeftSidebar: false,
    showRightPanel: false,
    showDialogBox: false,
  },
  reducers: {
    showLeftSidebar: (state) => {
      state.showLeftSidebar = true;
    },
    hideLeftSidebar: (state) => {
      state.showLeftSidebar = false;
    },
    showRightPanel: (state) => {
      state.showRightPanel = true;
    },
    hideRightPanel: (state) => {
      state.showRightPanel = false;
    },
    toggleDialogBox: (state) => {
      state.showDialogBox = !state.showDialogBox;
    },
    showDialogBox: (state) => {
      state.showDialogBox = true;
    },
    hideDialogBox: (state) => {
      state.showDialogBox = false;
    },
    closeAllPanels: (state) => {
      state.showLeftSidebar = false;
      state.showRightPanel = false;
      state.showDialogBox = false;
    },
  },
});

export const {
  toggleLeftSidebar,
  toggleRightSidebar,
  showLeftSidebar,
  hideLeftSidebar,
  showRightPanel,
  hideRightPanel,
  closeAllPanels,
  toggleDialogBox,
  showDialogBox,
  hideDialogBox,
} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
