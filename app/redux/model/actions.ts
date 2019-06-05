import { createActionWrapper } from '../utils/typedAction';
import { SetGridStatePayload, SetDimensionsPayload, SetCluePayload } from './types';

// Layers
export const setDimensions = createActionWrapper<SetDimensionsPayload>('CROSSWORD - SET DIMENSIONS');
export const setGridState = createActionWrapper<SetGridStatePayload>('CROSSWORD - SET GRID STATE');
export const setClue = createActionWrapper<SetCluePayload>('CROSSWORD - SET CLUE');