import { createSlice } from "@reduxjs/toolkit";

const bluetoothSlice = createSlice({
    name: 'bluetooth',
    initialState: {
        data: null,
    },
    reducers:{
        setBluetoothData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setBluetoothData } = bluetoothSlice.actions;
export const selectBluetoothData = (state) => state.bluetooth.data;
export default bluetoothSlice.reducer;