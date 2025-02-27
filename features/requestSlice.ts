// features/api/apiSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Define the shape of our API state
interface ApiState {
  data: any;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  token: string | null;
  isLoading : boolean;
  success : boolean;
}

// Initial state
const initialState: ApiState = {
  data: null,
  status: "idle",
  error: null,
  token: null,
  isLoading : false,
  success : false,
};

interface RequestData {
  recipientName: string;
  recipientAge: string;
  hospitalName: string;
  doctorsName: string;
  hospitalLocation: string;
  hospitalStateOfResidence: string;
  reason: string;
  bloodType: string;
  isRequestForSelf: boolean;
}
interface ApiResponse {
  message: string;
  request: RequestData; // Adjust this based on the actual structure returned by your API
}


// Thunk to create a blood request
export const createBloodRequest = createAsyncThunk<
  ApiResponse, // The type of data returned by the thunk
  RequestData, // The type of the argument passed to the thunk
  { rejectValue: string } // The type for rejected error messages
>(
  "api/createBloodRequest",
  async (requestData, { getState, rejectWithValue }) => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem("userToken");
      console.log(token, "token")
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      // Make the POST request to create a blood request
      const response = await axios.post(
        "https://save-a-life-backend.onrender.com/request/create",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      // Handle errors appropriately
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create the slice
const apiSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      AsyncStorage.setItem("userToken", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      AsyncStorage.removeItem("userToken");
    },
    resetState: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
      state.token = null;
      state.isLoading = false;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBloodRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBloodRequest.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(createBloodRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export the reducer and actions
export const { resetState, setToken, clearToken } = apiSlice.actions;
export default apiSlice.reducer;
 