import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof persistedReducer>;

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__({
        trace: true,
        traceLimit: 25,
      })
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
