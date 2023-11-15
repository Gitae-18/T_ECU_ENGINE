import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Image } from "react-native";
const MileSlice = createSlice({
    name:'Mile',
    
    initialState:{        
        total:0,
        average:0,
        least:0,
    },
    
    reducers:{        
        setToatl: (state, action) => {
            state.total= action.payload;
        },
        setAverage: (state, action) => {
            state.average = action.payload;
        },
        setLeast: (state, action) => {
            state.least = action.payload;
        },
    }
    
});

export const { setToatl, SetAverage, setLeast} = MileSlice.actions;
export const selectTotalData = (state) => state.Mile.total;
export const  selectAverageData = (state) => state.Mile.average;
export const  selectLeastData = (state) => state.Mile.least;
export default MileSlice.reducer;