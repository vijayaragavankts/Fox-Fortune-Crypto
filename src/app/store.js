import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Initial state for user details
const initialState = {
  userDetails: null,
};

// Create a slice for user details
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      // Extract necessary information from the Firebase User object
      const { uid, email, displayName, photoURL } = action.payload;
      state.userDetails = { uid, email, displayName, photoURL };
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

// Export action creators
export const { setUserDetails, clearUserDetails } = userSlice.actions;

// Combine reducers
const rootReducer = {
  [cryptoApi.reducerPath]: cryptoApi.reducer,
  user: userSlice.reducer,
};

// Configure middleware
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(cryptoApi.middleware);

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware,
});

// Update user details in Redux store when authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Extract necessary information from the Firebase User object
    const { uid, email, displayName, photoURL } = user;
    // Dispatch setUserDetails with the serialized user information
    store.dispatch(setUserDetails({ uid, email, displayName, photoURL }));
  } else {
    store.dispatch(clearUserDetails());
  }
});

export default store;
