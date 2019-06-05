import * as React from 'react';
import './Grid.scss';

interface Props {
    width: number;
    height: number;
}

export class GridLines extends React.Component<Props, {}> {
    public render() {
        return (
            <g fill="transparent" stroke="#394B59">
                {this.renderLines()}
            </g>
        );
    }

    private renderLines() {
        const lines = [];

        for(let i = 0; i <= this.props.width; i++) {
            let classNames = "";
            lines.push(<path className={classNames} d={`M${i} ${0} v ${this.props.width}`} key={`vertical-${i}`} strokeWidth={1} vectorEffect='non-scaling-stroke'/>);
        }

        for(let i = 0; i <= this.props.height; i++) {
            let classNames = "";
            lines.push(<path className={classNames} d={`M${0} ${i} h ${this.props.width}`} key={`horizontal-${i}`} strokeWidth={1} vectorEffect='non-scaling-stroke'/>);
        }

        return lines;
    }
}