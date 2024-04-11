import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        criteria: ""
    },
    reducers: {
        updateCriteria: (state, action) => {
            return {
                ...state,
                criteria: action.payload
            }
        },
    }
});

export const { updateCriteria } = searchSlice.actions;

export const searchData = (state) => state.search;

export default searchSlice.reducer;