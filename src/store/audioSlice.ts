import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AudioStatus } from "../types/audioStatus";
import { RootState } from "./index";

export interface AudioState {
  status: AudioStatus;
}

const initialState: AudioState = {
  status: AudioStatus.notActive,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<AudioStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = audioSlice.actions;

export const selectStatus = (state: RootState) => state.audio.status;

export default audioSlice.reducer;
