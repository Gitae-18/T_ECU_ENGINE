import { configureStore } from '@reduxjs/toolkit'
import bluetoothReducer from './bluetoothSlice'; // Bluetooth 데이터를 관리하는 리듀서
  const store = configureStore({
  reducer: {
    bluetooth: bluetoothReducer,
  },
})

export default store;