import {
    createStore,
    applyMiddleware
} from "redux";
import createSagaMiddleware from "redux-saga";
// import createLogger from "redux-logger";
import {
    googleAPILoaded
} from './actions'
import reducer from "./reducer";
import rootSaga from "./sagas";
import observable from 'riot-observable'

export default function configureStore(initialState) {
    // const logger = createLogger();
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    );
    observable(store);
    store.on('google-loaded', () => {
        store.dispatch(googleAPILoaded())
    })
    sagaMiddleware.run(rootSaga);
    return store;
}