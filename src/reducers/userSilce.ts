import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface userStateType {
  currentUser: Object | undefined
} 

const initialState: userStateType = {
  currentUser: undefined
}

const userSlice = createSlice({
  name: "userSlice", //must be unique for every slice. convention is to put the same as file name
  initialState, //the initial state of the slice
  reducers: {
    SetCurrentUser: (state,action: PayloadAction<userStateType>) => {
      state.currentUser = action.payload
    },
    RemoveCurrentUser: (state) => {
      state.currentUser = undefined
    },
  },
})

export const userServices = {
  actions: userSlice.actions,
}

const userReducer = userSlice.reducer
export default userReducer