import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listId: undefined,
};

export const cardAsList = createSlice({
    name: "cardAsList",
    initialState,
    reducers: {
        addListId: (state, { payload }) => {
            state.listId = payload;
        },
    },
});

export const { addListId, } = cardAsList.actions;

export default cardAsList.reducer;