import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import LoginSignupApi from '../query/server/LoginSignupSlice';
import authReducer from './authSlice'; // Import authSlice

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        // API
        [LoginSignupApi.reducerPath]: LoginSignupApi.reducer,
        // Auth slice
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(LoginSignupApi.middleware),
});

setupListeners(store.dispatch);

export default store;