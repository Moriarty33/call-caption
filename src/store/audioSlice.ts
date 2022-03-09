import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AudioStatus } from "../types/audioStatus";
import { RootState } from "./index";

export interface AudioState {
  status: AudioStatus;
  messages: string[];
}

const initialState: AudioState = {
  status: AudioStatus.notActive,
  messages: ["..."],
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<AudioStatus>) => {
      state.status = action.payload;
    },
    setLastMessage: (state, action: PayloadAction<string>) => {
      state.messages[state.messages.length - 1] = action.payload;
    },
    makeLastMessageCompleted: (state, action: PayloadAction<string | null>) => {
      const lastMessage = action.payload
        ? action.payload
        : state.messages[state.messages.length - 1];
      state.messages[state.messages.length - 1] = lastMessage;

      if (lastMessage) {
        state.messages.push("");
      }
    },
  },
});

export const { setStatus, setLastMessage, makeLastMessageCompleted } =
  audioSlice.actions;

export const selectStatus = (state: RootState) => state.audio.status;
export const selectMessages = (state: RootState) => state.audio.messages;

export default audioSlice.reducer;
