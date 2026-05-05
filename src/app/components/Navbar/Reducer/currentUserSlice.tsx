import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/src/lib/store'
interface ExploreHotelsResultSliceState {

 
  currentUser: Record<string, any>
  permissions: Record<string, any>
}


const initialState: ExploreHotelsResultSliceState = {
  
    currentUser: {},
    permissions:{}
}


export const currentUserSlice = createSlice({
  name: 'currentUserSlice',
  initialState,
  reducers: {

    

    storeCurrentUserSlice: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload
    },

    storeCurrentUserPermission: (state, action: PayloadAction<any>) => {
      state.permissions = action.payload
    },


    

    

    
  },
})

export const { storeCurrentUserSlice,storeCurrentUserPermission} = currentUserSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getCurrentUserSliceData = (state: RootState) => state.currentUserSlice
// Base selector

export const getPermissionFromRedux = (state: RootState) => state.currentUserSlice.permissions

export default currentUserSlice.reducer
