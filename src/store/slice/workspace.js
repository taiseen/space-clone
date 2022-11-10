import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  selectedWorkspace: null,
  workspaces: [],
};


export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    addWorkSpace: (state, { payload }) => {
      state.workspaces = payload;
    },
    setSelectedWorkSpaceId: (state, { payload }) => {
      state.selectedWorkspace = payload;
    },
  },
});


export const { addWorkSpace, setSelectedWorkSpaceId } = workspaceSlice.actions;

export default workspaceSlice.reducer;
