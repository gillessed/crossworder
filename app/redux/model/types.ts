export type Grid = Array<Array<string | null>>;

export interface Crossword {
    title: string;
    author: string;
    width: number;
    height: number;
    grid: Grid;
    acrossClues: { [key: number]: string };
    downClues: { [key: number]: string };
    enforceSymmetry: boolean;
    minimumClueLength?: number;
}

export type Indices = { x: number, y: number }[];

export interface SetDimensionsPayload {
    width: number;
    height: number;
}

export interface SetGridStatePayload {
    x: number;
    y: number;
    state: string | null;
}

export interface SetCluePayload {
    direction: 'across' | 'down';
    clue: string;
}

export function createEmptyCrossword(): Crossword {
    const width = 15;
    const height = 15;
    const grid = [];
    for (let x = 0; x < width; x++) {
        grid.push([]);
        for (let y = 0; y < height; y++) {
            grid[x].push('');
        }
    }
    return {
        title: 'My Crossword',
        author: 'Author',
        width,
        height,
        grid,
        acrossClues: {},
        downClues: {},
        enforceSymmetry: true,
    };
}