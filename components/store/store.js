import { configureStore } from '@reduxjs/toolkit'
import bluetoothReducer from './bluetoothSlice'; // Bluetooth 데이터를 관리하는 리듀서
import VehicleAmountReducer from './VehicleAmount';
import alarmReducer from './alarmSlice';
  const store = configureStore({
  reducer: {
    bluetooth: bluetoothReducer,
    vehicle: VehicleAmountReducer,
    alarm: alarmReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

export default store;