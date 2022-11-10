import { createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addBulkMessage: (state, { payload }) => {
      state.messages = payload;
    },
    addSingleMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    removeMessage: (state, { payload }) => {
      state.messages = state.messages.filter((m) => m._id !== payload);
    },
    addReaction: (state, { payload }) => {
      state.messages = state.messages.map((m) => {
        if (m._id === payload.messageId) {
          let reactionChanged = false;

          m.reactions = m.reactions.map((r) => {
            if (r.reactor?._id === payload.react.reactor?._id) {
              r.reaction = payload.react.reaction;
              reactionChanged = true;
            }

            return r;
          });

          if (!reactionChanged) {
            m.reactions.push(payload.react);
          }
        }
        return m;
      });
    },
  },
});

export const { addBulkMessage, addSingleMessage, addReaction, removeMessage } =
  messageSlice.actions;

export default messageSlice.reducer;
