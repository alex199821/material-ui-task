import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { users } from "../utils/mockData";
import { User } from "../interfaces";
//----------------Due to Redux Best Practices all data in store has to be serialized, therefore dates are stored as timestamps----------------//

export interface usersDataState {
  usersData: User[];
}

const initialState: usersDataState = {
  usersData: users,
};

export const usersDataSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    addNewRow: (state, action: PayloadAction<User>) => {
      state.usersData = state.usersData.concat(action.payload);
    },
    editRow: (state, action: PayloadAction<User>) => {
      //Exsiting user data is mapped and if id of user sent by action.payload matches id of mapped user it is being replaced
      const updatedUsersData: User[] = state.usersData.map((user: User) =>
        user.id === action.payload.id ? action.payload : user
      );
      state.usersData = updatedUsersData;
    },
  },
});

export const { addNewRow, editRow } = usersDataSlice.actions;

export default usersDataSlice.reducer;
