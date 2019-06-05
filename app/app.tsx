import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
import logger from 'redux-logger';
import { SagaListener, resetListeners, SagaRegistration } from './redux/sagaListener';
import { dispatchers, Dispatchers } from './redux/dispatchers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './redux/rootSaga';
import { Root } from './containers/Root';
import { etn } from './etn';

export const DispatchContext = React.createContext<Dispatchers>(undefined);
export const SagaContext = React.createContext<SagaRegistration>(undefined);

const ShittyProvider = Provider as any;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(
        logger,
        sagaMiddleware,
    ),
);

const sagaListeners: Set<SagaListener<any>> = new Set();
const sagaRegister: SagaRegistration = {
    register: (listener: SagaListener<any>) => {
        this.listeners.add(listener);
        this.store.dispatch(resetListeners(undefined));
    },
    unregister: (listener: SagaListener<any>) => {
        this.listeners.delete(listener);
        this.store.dispatch(resetListeners(undefined));
    },
};
sagaMiddleware.run(rootSaga, sagaListeners);

const providers = (
    <ShittyProvider store={store}>
        <DispatchContext.Provider value={dispatchers(store)}>
            <SagaContext.Provider value={sagaRegister}>
                <Root/>
            </SagaContext.Provider>
        </DispatchContext.Provider>
    </ShittyProvider>
)

ReactDOM.render(
    providers as any,
    document.getElementById("content"),
);