// https://bluelight.co/blog/redux-toolkit-with-typescript

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, users } from "../utils/mockData";

export interface usersDataState {
  usersData: User[];
  // incrementAmount: number
}

const initialState: usersDataState = {
  usersData: users,
  // incrementAmount : 1
};

export const usersDataSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += state.incrementAmount
    // },
    // decrement: (state) => {
    //   state.value -= state.incrementAmount
    // },
    addNewRow: (state, action: PayloadAction<User>) => {
      state.usersData = state.usersData.concat(action.payload);
    },
  },
});

export const { addNewRow } = usersDataSlice.actions;

export default usersDataSlice.reducer;
