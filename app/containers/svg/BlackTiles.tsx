import * as React from 'react';
import { Indices, Grid } from '../../redux/model/types';
import { CELL_SIZE } from './SvgRoot';

interface Props {
    width: number;
    height: number;
    grid: Grid;
}

export class BlackTiles extends React.Component<Props, {}> {
    public render() {
        const tiles: JSX.Element[] = [];
        for (let x = 0; x < this.props.width; x++) {
            for (let y = 0; y < this.props.height; y++) {
                if (this.props.grid[x][y] === null) {
                    tiles.push(
                        <rect
                            x={x * CELL_SIZE}
                            y={y * CELL_SIZE}
                            width={CELL_SIZE}
                            height={CELL_SIZE}
                            fill='#000000'
                            stroke='none'
                            key={`${x}.${y}`}
                        />
                    );
                }
            }
        }
        return tiles;
    }
}
