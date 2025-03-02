import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define API Base URL (change this to your backend URL)
const API_URL = "https://save-a-life-backend.onrender.com";

// Define Types for User Data
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token:string
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  success : boolean
  loginSuccess: boolean,
}

// Define Response Types
interface AuthResponse {
  message?: string;
  data: User;
  token: string;
}

interface ErrorResponse {
  error: string;
  message: string;
}

// Define User Input Types
interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  currentAddress: string;
  stateOfResidence: string;
  dateOfBirth: Date | null;
  lastDonationDate: Date | null;
  bloodType: string | null;
}

interface LoginData {
  email: string;
  password: string;
}

interface OTPData {
  email: string;
  otp: string;
}

// Async Thunks for API calls
export const signUpUser = createAsyncThunk<
  AuthResponse,
  SignUpData,
  { rejectValue: ErrorResponse }
>("auth/signUp", async (userData, { rejectWithValue }) => {
  try {
   
    const response = await axios.post(
      `${API_URL}/auth/signup`,
      userData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginData,
  { rejectValue: ErrorResponse }
>("auth/login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/auth/login`,
      loginData
    );
    await AsyncStorage.setItem("userToken", response.data.data.token); 
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const verifyOTP = createAsyncThunk<
  { message: string },
  OTPData,
  { rejectValue: ErrorResponse }
>("auth/verifyOTP", async (otpData, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${API_URL}/auth/verify?email=${otpData.email}&otp=${otpData.otp}`,);
      console.log(response.data, "response data")
    return response.data;
  } catch (error: any) {
    console.log(error.response.data,"error")
    return rejectWithValue(error.response.data);
  }
});

// Authentication slice
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  success : false,
  loginSuccess : false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.success = false;
      state.loginSuccess = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        signUpUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.data;
          state.token = action.payload.token;
          state.success = true;
        }
      )
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || action.payload?.message || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.data;
          state.token = action.payload.token;
          state.loginSuccess = true
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.error || action.payload?.message || "Login failed";
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        verifyOTP.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.isLoading = false;
          state.success = true
        }
      )
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || action.payload?.message || "OTP verification failed";
      });
  },
});

export const { logout, resetState } = authSlice.actions;
export default authSlice.reducer;
