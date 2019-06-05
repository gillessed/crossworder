import * as React from 'react';
import { Indices, Grid } from '../../redux/model/types';
import { CELL_SIZE } from './SvgRoot';

interface Props {
    x: number;
    y: number;
}

export class SelectedCell extends React.Component<Props, {}> {
    public render() {
        return (
            <rect
                x={this.props.x * CELL_SIZE}
                y={this.props.y * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill='#0066ff'
                fillOpacity={0.3}
                stroke='#0066ff'
                strokeOpacity={0.6}
                strokeWidth='3'
            />
        );
    }
}
