import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import LoginSignupApi from '../query/server/LoginSignupSlice';
import authReducer from './authSlice';
import contactApi from '../query/server/ContactSlice';
import predictSkinAPi from "../query/server/PredictSkin";
import TotalUserApi from '../query/server/TotalUser';
import activeUserTodayApi from "../query/server/ActiveUserTodaySlice"
import TotalScanApi from "../query/server/TotalScanSlice"
import MostPredictSkinApi from "../query/server/MostPrdictSkin"
import activitiesUsersApi from "../query/server/ActivitiesOfUsersSlice"

const store = configureStore({
    reducer: {
        // RTK Query API reducers
        [LoginSignupApi.reducerPath]: LoginSignupApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [predictSkinAPi.reducerPath]: predictSkinAPi.reducer,
        [TotalUserApi.reducerPath]: TotalUserApi.reducer,
        [activeUserTodayApi.reducerPath]: activeUserTodayApi.reducer,
        [TotalScanApi.reducerPath]: TotalScanApi.reducer,
        [MostPredictSkinApi.reducerPath]: MostPredictSkinApi.reducer,
        [activitiesUsersApi.reducerPath]: activitiesUsersApi.reducer,

        // Normal slice reducers
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(LoginSignupApi.middleware)
            .concat(contactApi.middleware)
            .concat(predictSkinAPi.middleware)
            .concat(TotalUserApi.middleware)
            .concat(activeUserTodayApi.middleware)
            .concat(TotalScanApi.middleware)
            .concat(MostPredictSkinApi.middleware)
            .concat(activitiesUsersApi.middleware)
    ,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
