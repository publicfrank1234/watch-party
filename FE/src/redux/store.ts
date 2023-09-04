// store.ts
import { configureStore } from "@reduxjs/toolkit";
import videoPlayerReducer from "./videoPlayerSlice"; // Create this slice as described below

const store = configureStore({
  reducer: {
    videoPlayer: videoPlayerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
