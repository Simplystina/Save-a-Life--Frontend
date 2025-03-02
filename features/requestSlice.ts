// features/api/apiSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { navigateToLogin } from "@/app/utils/navigation";

// Define the shape of our API state
interface ApiState {
  data: any;
  recipientRequests: RequestData[] | null;
  status: "idle" | "loading" | "success" | "failed";
  requestsStatus: "idle" | "loading" | "success" | "failed";
  error: string | null;
  token: string | null;
  isLoading: boolean;
  success: boolean;
}

// Initial state
const initialState: ApiState = {
  data: null,
  recipientRequests: null,
  status: "idle",
  requestsStatus: "idle",
  error: null,
  token: null,
  isLoading: false,
  success: false,
};

interface RequestData {
  _id: string;
  recipientId: string;
  bloodType: string;
  isRequestForSelf: boolean;
  status: string;
  recipientName: string;
  hospitalName: string;
  hospitalLocation: string;
  hospitalStateOfResidence: string;
  doctorsName: string;
  age: number;
  reason: string;
  suggestedDonors: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
interface ApiResponse {
  message: string;
  data: RequestData; // Adjust this based on the actual structure returned by your API
}

interface RequestsResponse {
  message: string;
  data: RequestData[]; // Array of requests returned by the API
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
      )
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

// New async thunk for getting all requests made by a recipient
export const getRecipientRequests = createAsyncThunk<
  RequestsResponse,
  void,
  { rejectValue: string }
>("api/getRecipientRequests", async (_, { rejectWithValue, dispatch }) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    const response = await axios.get(
      "https://save-a-life-backend.onrender.com/request/recipient/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    // Check for 401 Unauthorized Error (Token Expired)
    if (error.response?.status === 401) {
      console.warn("Token expired, logging out...");

      // Clear the token from Redux and AsyncStorage
      dispatch(clearToken());

      // Redirect user to login screen
      navigateToLogin();
    }

    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

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
      state.recipientRequests = null;
      state.status = "idle";
      state.requestsStatus = "idle";
      state.error = null;
      state.token = null;
      state.isLoading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create blood request cases
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
      })

      // Get recipient requests cases
      .addCase(getRecipientRequests.pending, (state) => {
        state.requestsStatus = "loading";
      })
      .addCase(getRecipientRequests.fulfilled, (state, action) => {
        state.requestsStatus = "success";
        state.recipientRequests = action.payload.data;
      })
      .addCase(getRecipientRequests.rejected, (state, action) => {
        state.requestsStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export the reducer and actions
export const { resetState, setToken, clearToken } = apiSlice.actions;
export default apiSlice.reducer;
