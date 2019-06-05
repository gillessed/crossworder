import { Store } from 'redux';
import { ReduxState } from './rootReducer';
import { ModelDispatcher, createModelDispatcher } from './model/dispatchers';

export interface Dispatchers {
    model: ModelDispatcher;
}

export const dispatchers = (store: Store<ReduxState>): Dispatchers => {
    return {
        model: createModelDispatcher(store),
    };
};