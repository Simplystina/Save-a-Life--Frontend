// features/api/apiSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { navigateToLogin } from "@/app/utils/navigation";

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


export const createBloodRequest = createAsyncThunk<
  ApiResponse,
  RequestData,
  { rejectValue: string }
>(
  "api/createBloodRequest",
  async (requestData, { rejectWithValue, dispatch }) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token, "token");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

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

      console.log(response.data, "data");
      return response.data;
    } catch (error: any) {
      console.log(error, "error");

      // Check for 401 Unauthorized Error (Token Expired)
      if (error.response?.status === 401) {
        console.warn("Token expired, logging out...");

        // Clear the token from Redux and AsyncStorage
        dispatch(clearToken());

        // Redirect user to login screen
       navigateToLogin(); // Call the function to handle navigation
      }

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
 