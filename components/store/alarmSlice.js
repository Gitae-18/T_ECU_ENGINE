import { createSlice } from "@reduxjs/toolkit";

const alarmSlice = createSlice({
    name: 'alarm',
    initialState: {
        seat: true,
        backlight: true,
        battery: true,
        oil_emergency: true,
        emergency: true,
        parking: true,
        oil_temp: true,
        oil_pressure: true,
        coolant_temp: true,
    },
    reducers: {
        setAlarmData: (state, action) => {
            return { ...state, ...action.payload };
          },
       /*  setBacklight: (state,action) => {
            state.backlight = action.payload;
        },
        setBattery: (state,action) => {
            state.battery = action.payload;
        },
        setOilEmergency: (state,action) => {
            state.oil_emergency = action.payload;
        },
        setEmergency: (state,action) => {
            state.emergency = action.payload;
        },
        setParking: (state,action) => {
            state.parking = action.payload;
        },
        setOilTemp: (state,action) => {
            state.oil_temp = action.payload;
        },
        setPressure: (state,action) => {
            state.oil_pressure = action.payload;
        },
        setCoolantTemp: (state,action) => {
            state.coolant_temp = action.payload;
        }, */
    }
});

export const { setAlarmData } = alarmSlice.actions;
export const selectAlarmData = (state) => state.alarm;

export default alarmSlice.reducer;