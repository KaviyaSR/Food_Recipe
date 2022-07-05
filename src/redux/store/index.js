import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootSaga from "../sagas/index";
import callAPIMiddleware from "../../services/callAPIMiddleware";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, callAPIMiddleware];

if (process.env.NODE_ENV !== "production") {
  middlewares.push(createLogger());
}

function configureStore(preloadedState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  // sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept("../reducers/index", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const store = configureStore();

export default store;
