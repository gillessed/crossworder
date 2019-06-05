import * as React from 'react';
import './Root.scss'
import { Dispatchers } from '../redux/dispatchers';
import { SvgRoot } from './svg/SvgRoot';
import { ReduxState } from '../redux/rootReducer';
import { connect } from 'react-redux';
import { Crossword } from '../redux/model/types';
import { Title } from './title/Title';
import { DispatchContext } from '../app';
import { withDispatchContext } from '../contexts';
import { addKeyListener } from '../keyListeners';
import { validCell } from '../redux/model/utils';

interface StateProps {
    model: Crossword;
}

interface OwnProps {
    dispatchers: Dispatchers;
}

type Props = StateProps & OwnProps;

interface State {
    selectedCell: {
        x: number,
        y: number,
    } | null,
    selectedAnswer: {
        direction: 'across' | 'down',
        index: number,
    } | null,
    lockGrid: boolean;
}

export class RootComponent extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedCell: null,
            selectedAnswer: null,
            lockGrid: false,
        };
    }

    public componentWillMount() {
        addKeyListener(this.onKeyDown);
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.state.selectedCell && nextProps.model.grid[this.state.selectedCell.x][this.state.selectedCell.y] === null) {
            setTimeout(() => {
                this.setState({
                    selectedCell: null,
                });
            });
        }
    }

    public render() {
        return (
            <div className='container root-container'>
                <Title title={this.props.model.title} />
                <SvgRoot
                    model={this.props.model}
                    selectedCell={this.state.selectedCell}
                    selectCell={this.selectCell}
                    deselectCell={this.deselectCell}
                />
            </div>
        );
    }

    public selectCell = (x: number, y: number) => {
        this.setState({
            selectedCell: { x, y },
        });
    }

    public deselectCell = () => {
        this.setState({
            selectedCell: null,
        });
    }

    public onKeyDown = (e: KeyboardEvent) => {
        switch (e.keyCode) {
            case 37: this.moveSelection('-x'); break;
            case 38: this.moveSelection('-y'); break;
            case 39: this.moveSelection('+x'); break;
            case 40: this.moveSelection('+y'); break;
        }
    }

    private moveSelection = (direction: '-x' | '+x' | '-y' | '+y') => {
        if (!this.state.selectedCell) {
            return;
        }
        let newCell = { ...this.state.selectedCell };
        let blocked = false;
        do {
            switch (direction) {
                case '-x': newCell.x = newCell.x - 1; break;
                case '+x': newCell.x = newCell.x + 1; break;
                case '-y': newCell.y = newCell.y - 1; break;
                case '+y': newCell.y = newCell.y + 1; break;
            }
            if (!validCell(newCell.x, newCell.y, this.props.model.grid)) {
                blocked = true;
                break;
            }
        } while (this.props.model.grid[newCell.x][newCell.y] === null);
        if (blocked) {
            return;
        }
        this.setState({
            selectedCell: newCell,
        });
    }
}

const mapStateToProps = (redux: ReduxState) => {
    return {
        model: redux.model,
    };
};

export const Root = withDispatchContext(connect<StateProps, {}, OwnProps>(mapStateToProps)(RootComponent));
