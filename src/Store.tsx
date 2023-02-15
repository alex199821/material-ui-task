import { configureStore } from "@reduxjs/toolkit";
import usersDataSlice from "./features/usersDataSlice";
export const store = configureStore({
  reducer: {
    usersData: usersDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
