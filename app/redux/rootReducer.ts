import { combineReducers } from 'redux';
import { Crossword } from './model/types';
import { modelReducer } from './model/reducers';

export interface ReduxState {
    model: Crossword;
}

export const rootReducer = combineReducers<ReduxState>({
    model: modelReducer,
});