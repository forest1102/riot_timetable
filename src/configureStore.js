import {
    createStore,
    applyMiddleware
} from "redux";
import createSagaMiddleware from "redux-saga";
import createLogger from "redux-logger";
import reducer from "./reducer";
import rootSaga from "./sagas";

export default function configureStore(initialState) {
    // const sagaMiddleware = createSagaMiddleware();
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);
    return store;
}