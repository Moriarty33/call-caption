import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface AudioState {
  isRecording: boolean;
}

const initialState: AudioState = {
  isRecording: false,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    startRecording: (state) => {
      state.isRecording = true;
    },
    stopRecording: (state) => {
      state.isRecording = false;
    },
  },
});

export const { startRecording, stopRecording } = audioSlice.actions;

export const selectIsRecording = (state: RootState) => state.audio.isRecording;

export default audioSlice.reducer;
