import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    jwtToken: null,
    userId: null,
    userInfo: {},
};


export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        getUserInfo: (state, { payload }) => {
            state.userInfo = { ...state.userInfo, payload };
        },
        getUserId: (state, { payload }) => {
            state.userId = payload;
        },
        getUserToken: (state, { payload }) => {
            state.jwtToken = payload;
        },

    },
});


export const { getUserInfo, getUserId, getUserToken } = userInfoSlice.actions;

export default userInfoSlice.reducer;