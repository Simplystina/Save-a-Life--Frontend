import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"; // Import your reducers

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// ✅ Define types for TypeScript
export type RootState = ReturnType<typeof store.getState>; // Type for accessing state
export type AppDispatch = typeof store.dispatch; // Type for dispatching actions
