import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/src/lib/store'



const initialState: boolean = false;

const fullPageLoaderSlice = createSlice({
  name: 'fullPageLoaderSlice',
  initialState,
  reducers: {
    setFullPageLoader(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setFullPageLoader } = fullPageLoaderSlice.actions;
export const getFullPageLoaderState= (state: RootState) => state.fullPageLoaderSlice
export default fullPageLoaderSlice.reducer;
