import { createSlice } from "@reduxjs/toolkit";

const bluetoothSlice = createSlice({
    name: 'bluetooth',
    initialState: {
        data: 0,
        fuel: 0,
        coolant: 0,
        gear:'N',
        rpm: 0,
        mode:'manual',
        peripheral:'',
    },
    reducers: {
        setBluetoothData: (state, action) => {
            state.data = action.payload;
        },
        setFuelData: (state, action) => {
            state.fuel = action.payload;
        },
        setCoolantData: (state, action) => {
            state.coolant = action.payload;
        },
        setGearData: (state,action) => {
            state.gear = action.payload;
        },
        setRpmData: (state,action) => {
            state.rpm = action.payload;
        },
        setModeData: (state,action) => {
            state.mode = action.payload;
        },
        setPeripheral:(state,action) => {
            state.peripheral = action.payload;
        }
    }
});

export const { setBluetoothData, setFuelData, setCoolantData, setGearData, setRpmData, setPeripheral} = bluetoothSlice.actions;
export const selectBluetoothData = (state) => state.bluetooth.data;
export const selectFuelData = (state) => state.bluetooth.fuel;
export const selectCoolantData = (state) => state.bluetooth.coolant;
export const selectGearData = (state) => state.bluetooth.gear;
export const selectRpmData = (state) => state.bluetooth.rpm;
export const selectPeripheralData = (state) => state.bluetooth.peripheral;
export default bluetoothSlice.reducer;