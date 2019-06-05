import { Reducer } from 'redux';
import { newTypedReducer } from '../utils/typedReducer';
import { generateRandomString } from '../../utils/randomId';
import * as DotProp from 'dot-prop-immutable';
import { Crossword, createEmptyCrossword, SetGridStatePayload } from './types';
import { setGridState } from './actions';

const INITIAL_STATE: Crossword = createEmptyCrossword();

const setGridStateReducer = (state: Crossword, payload: SetGridStatePayload) => {
    let newState = DotProp.set(state, `grid.${payload.x}.${payload.y}`, payload.state);
    if (state.enforceSymmetry) {
        const x2 = state.width - payload.x - 1;
        const y2 = state.height - payload.y - 1;
        newState = DotProp.set(newState, `grid.${x2}.${y2}`, payload.state);
    }
    return newState;
}

export const modelReducer: Reducer<Crossword> = newTypedReducer<Crossword>()
    .handlePayload(setGridState.type, setGridStateReducer)
    .handleDefault((state = INITIAL_STATE) => state)
    .build();
