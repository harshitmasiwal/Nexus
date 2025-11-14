import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosConfig";


const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/register", data);
      return response.data.user; // success
    } catch (error) {
      // check if it's Axios error with response data
      if (error.response && error.response.data) {
        // if backend sends a string
        if (typeof error.response.data === "string") {
          return rejectWithValue(error.response.data); 
        }
        // if backend sends an object
        if (typeof error.response.data === "object") {
          return rejectWithValue(error.response.data.message || "Something went wrong");
        }
      }
      // fallback
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
   try {
  const response = await axiosClient.post("/user/login", data);
  return response.data.user; // success
} catch (error) {
  // Axios error has a `response` property with backend data
  if (error.response && error.response.data) {

    return rejectWithValue(error.response.data); 
  }
  
  // fallback
  return rejectWithValue(error.message || "Something went wrong");
}

  }
);

  const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get('/user/check');
      return data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(null); // Special case for no session
      }
      return rejectWithValue(error);
    }
  }
)

const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post("/user/logout");
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//now making of the slice

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something went wrong";
        state.isAuthenticated = false;
        state.user = null;
      })

      //login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || "something went wrong";
      })

      //check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message;
      })

      //logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export { registerUser, loginUser, checkAuth, logoutUser };
export default authSlice.reducer;
