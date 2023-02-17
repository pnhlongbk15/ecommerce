import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import { cartSlice } from "./Slice/cartSlice";
import { authSlice } from "./Slice/authSlice";

const store = configureStore({
        reducer: {
                cart: cartSlice.reducer,
                auth: authSlice.reducer,
        },
        middleware: [thunk, logger],
        devTools: process.env.NODE_ENV === 'development',
})

export default store