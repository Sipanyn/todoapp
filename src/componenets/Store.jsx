import { configureStore } from "@reduxjs/toolkit";
import todoSReducer from "../TodosSlice";
export const Store = configureStore({
  reducer: {
    todos: todoSReducer,
  },
});
