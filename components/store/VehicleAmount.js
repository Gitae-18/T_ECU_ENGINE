import { createSlice } from "@reduxjs/toolkit";

const VehicleAmount = createSlice({
    name:'vehicle',
    initialState:{
        data:0,
    },
    reducers:{
        setVehicleAmount: (state, action) => {
            state.data = action.payload;
        },
    }
})

export const { setVehicleAmount } = VehicleAmount.actions;
export const selectVehicleAmount = (state) => state.vehicle.data;
export default VehicleAmount.reducer;