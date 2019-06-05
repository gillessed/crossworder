import * as React from 'react';
import { Indices, Grid } from '../../redux/model/types';
import { CELL_SIZE } from './SvgRoot';
import { openCell } from '../../redux/model/utils';

interface Props {
    mouse: { x: number, y: number} | null;
    grid: Grid;
}

export class HoveredCell extends React.Component<Props, {}> {
    public render() {
        if (!this.props.mouse) {
            return <g/>;
        }
        const x = Math.floor(this.props.mouse.x / CELL_SIZE);
        const y = Math.floor(this.props.mouse.y / CELL_SIZE);
        if (!openCell(x, y, this.props.grid)) {
            return <g/>;
        }
        return (
            <rect
                x={x * CELL_SIZE}
                y={y * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill='#ffff00'
                fillOpacity={0.5}
                stroke='none'
            />
        );
    }
}
