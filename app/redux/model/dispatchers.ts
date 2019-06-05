import { Store } from 'redux';
import { ReduxState } from '../rootReducer';
import { createDispatcher, TypedDispatcher } from '../utils/typedDispatcher';
import { setDimensions, setGridState, setClue } from './actions';

const modelActions = {
    setDimensions,
    setGridState,
    setClue,
};
export type ModelDispatcher = TypedDispatcher<typeof modelActions>;
export function createModelDispatcher(store: Store<ReduxState>): ModelDispatcher {
    return createDispatcher(store, modelActions);
}
