import { configureStore } from '@reduxjs/toolkit'
import bluetoothReducer from './bluetoothSlice'; // Bluetooth 데이터를 관리하는 리듀서
import VehicleAmountReducer from './VehicleAmount';
import alarmReducer from './alarmSlice';
import MileReducer from './MileSlice';
import GaugeReducer from './GaugeSlice';
  const store = configureStore({
  reducer: {
    bluetooth: bluetoothReducer,
    vehicle: VehicleAmountReducer,
    alarm: alarmReducer,
    mile: MileReducer,
    gauge: GaugeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

export default store;