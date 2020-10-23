import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './redux/exampleSlice'
export default configureStore({
  reducer: {
    example: exampleReducer,
  }
});
