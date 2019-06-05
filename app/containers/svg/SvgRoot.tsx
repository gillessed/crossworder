import * as React from 'react';
import { ReduxState } from '../../redux/rootReducer';
import { connect } from 'react-redux';
import { Dispatchers, dispatchers } from '../../redux/dispatchers';
import { Crossword } from '../../redux/model/types';
import { GridLines } from './grid/Grid';
import { GridIndices } from './GridIndices';
import { indicesSelector } from '../../redux/model/selectors';
import { DispatchContext } from '../../app';
import { withDispatchContext } from '../../contexts';
import { Omit } from '../../utils/omit';
import { BlackTiles } from './BlackTiles';
import { SelectedCell } from './SelectedCell';
import { HoveredCell } from './HoveredCell';

interface State {
    mouse: {
        x: number,
        y: number,
    } | null;
}

interface Props {
    model: Crossword;
    dispatchers: Dispatchers;
    selectedCell: { x: number, y: number } | null;
    selectCell: (x: number, y: number) => void;
    deselectCell: (x: number, y: number) => void;
}

export const CELL_SIZE = 40;

class SvgRootComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            mouse: null,
        };
    }

    public render() {
        const svgWidth = CELL_SIZE * this.props.model.width;
        const svgHeight = CELL_SIZE * this.props.model.height;
        const xScale = svgWidth / this.props.model.width;
        const yScale = svgHeight / this.props.model.height;
        return (
            <svg
                className='app-canvas'
                width={svgWidth + 5}
                height={svgHeight + 5}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
                onMouseLeave={this.onMouseLeave}
            >
                <g transform={`scale(${xScale} ${yScale})`}>
                    <GridLines width={this.props.model.width} height={this.props.model.height}/>
                </g>
                <BlackTiles width={this.props.model.width} height={this.props.model.height} grid={this.props.model.grid}/>
                {this.props.selectedCell && <SelectedCell x={this.props.selectedCell.x} y={this.props.selectedCell.y}/>}
                <HoveredCell mouse={this.state.mouse} grid={this.props.model.grid}/>
                <GridIndices
                    width={this.props.model.width}
                    height={this.props.model.height}
                    indices={indicesSelector(this.props.model)}
                />
            </svg>
        );
    }
    
    private onMouseUp = (e: React.MouseEvent<SVGElement>) => {
        const gridX = Math.floor(this.state.mouse.x / CELL_SIZE);
        const gridY = Math.floor(this.state.mouse.y / CELL_SIZE);
        if (gridX < 0 || gridX >= this.props.model.width
            || gridY < 0 || gridY >= this.props.model.height) {
                return;
        }
        if (e.button === 0) {
            if (this.props.model.grid[gridX][gridY] === null) {
                return;
            }
            
            this.props.selectCell(gridX, gridY);
        } else if (e.button === 2 && this.state.mouse) {
            let newState: string | null = null;
            if (this.props.model.grid[gridX][gridY] === null) {
                newState = '';
            }
            this.props.dispatchers.model.setGridState({
                x: gridX,
                y: gridY,
                state: newState,
            });
        }
    }
    
    private onMouseMove = (e: React.MouseEvent<SVGElement>) => {
        this.setState({
            mouse: {
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
            },
        });
    }

    private onMouseLeave = (e: React.MouseEvent<SVGElement>) => {
        this.setState({
            mouse: null,
        });
    }

    private onKeyUp = (e: React.KeyboardEvent<SVGElement>) => {
        console.log(e.keyCode);
    }
}

export const SvgRoot = withDispatchContext<Props>(SvgRootComponent);