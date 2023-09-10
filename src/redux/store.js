import { configureStore } from "@reduxjs/toolkit";

import booksReducer from "./bookStore/booksSlice";
import appReducer from "./app/appSlice";
//-----------------------|| REDUX - MAIN STORE ||-----------------------//

export const store = configureStore({
  reducer: {
    app: appReducer,
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
