import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formDataSlice";
import draftReducer from "./slices/draftSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
  whitelist: "drafts"
};

const combinedReducer = combineReducers({
  formdata: formReducer,
  drafts: draftReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
export const persistor = persistStore(store);

export default store;
