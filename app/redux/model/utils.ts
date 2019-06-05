import { Grid } from './types';

export function validCell(x: number, y: number, grid: Grid): boolean {
    return !(x < 0 || x >= grid.length || y < 0 || y >= grid[x].length);
}

export function openCell(x: number, y: number, grid: Grid): boolean {
    return validCell(x, y, grid) && grid[x][y] !== null;
}