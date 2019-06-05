import * as React from 'react';
import { Indices } from '../../redux/model/types';
import { CELL_SIZE } from './SvgRoot';

interface Props {
    width: number;
    height: number;
    indices: Indices;
}

export class GridIndices extends React.Component<Props, {}> {
    public render() {
        return (
            <g fill="#1F1F1F" fontSize={11}>
                {this.renderIndices()}
            </g>
        );
    }

    private renderIndices() {
        const indices: JSX.Element[] = [];
        this.props.indices.forEach((index, i) => {
            indices.push(
                <text
                    key={i}
                    x={index.x * CELL_SIZE + 2}
                    y={index.y * CELL_SIZE + 12}
                    className='unselectable unclickable'
                >
                    {i + 1}.
                </text>
            )
        });
        return indices;
    }
}