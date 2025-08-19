import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null;
    name: string | null
    email: string | null
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem("accessToken") || null,
    name: localStorage.getItem("userName") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    email: localStorage.getItem("email") || null,

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; name: string, email: string }>) => {
            state.accessToken = action.payload.token;
            state.isAuthenticated = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            localStorage.setItem("accessToken", action.payload.token);
            localStorage.setItem("userName", action.payload.name);
            localStorage.setItem("email", action.payload.email)
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userName")
            localStorage.removeItem("email")
        },
        updateName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            localStorage.setItem("userName", action.payload);
        },
    },
});

export const { login, logout, updateName } = authSlice.actions;
export default authSlice.reducer;