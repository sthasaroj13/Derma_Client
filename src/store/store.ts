import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import LoginSignupApi from '../query/server/LoginSignupSlice';
import authReducer from './authSlice'; // Import authSlice
import contactApi from '../query/server/ContactSlice';
import predictSkinAPi from "../query/server/PredictSkin"
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        // API
        [LoginSignupApi.reducerPath]: LoginSignupApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [predictSkinAPi.reducerPath]: predictSkinAPi.reducer,
        // Auth slice
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(LoginSignupApi.middleware).concat(contactApi.middleware).concat(predictSkinAPi.middleware),
});

setupListeners(store.dispatch);

export default store;