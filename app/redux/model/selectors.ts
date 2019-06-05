import { ReduxState } from '../rootReducer';
import { Crossword, Indices } from './types';

export const modelSelector = (state: ReduxState) => state.model;
export const indicesSelector = (model: Crossword) => {
    const indices: Indices = [];
    for (let y = 0; y < model.height; y++) {
        for (let x = 0; x < model.width; x++) {
            const isNull = model.grid[x][y] === null;
            const blockedAbove = y > 0 ? model.grid[x][y - 1] === null : true;
            const blockedBehind = x > 0 ? model.grid[x - 1][y] === null : true;
            if (!isNull && (blockedAbove || blockedBehind)) {
                indices.push({ x, y });
            }
        }
    }
    return indices;
};