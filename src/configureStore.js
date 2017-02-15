import {
    createStore,
    applyMiddleware
} from "redux";
import {
    googleAPILoaded
} from './actions'
import createSagaMiddleware from "redux-saga";
import createLogger from "redux-logger";
import reducer from "./reducer";
import rootSaga from "./sagas";
import riot from 'riot'

export default function configureStore(initialState) {
    // const sagaMiddleware = createSagaMiddleware();
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    );
    riot.observable(store);
    store.on('google-loaded', () => {
        store.dispatch(googleAPILoaded())
    })
    sagaMiddleware.run(rootSaga);
    return store;
}