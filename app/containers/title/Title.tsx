import * as React from 'react';
import './Title.scss';
import { Dispatchers } from '../../redux/dispatchers';
import { DispatchContext } from '../../app';

interface Props {
    title: string;
}

export class Title extends React.Component<Props, {}> {
    public static contextTypes = DispatchContext;
    private dispatchers: Dispatchers;

    constructor(props: Props, context: any) {
        super(props, context);
        this.dispatchers = this.context.dispatchers;
    }

    public render() {
        return (
            <h1>
                {this.props.title}
            </h1>
        );
    }
}
