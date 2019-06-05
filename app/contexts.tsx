import * as React from 'react';
import { DispatchContext } from './app';
import { Dispatchers } from './redux/dispatchers';
import { Omit } from './utils/omit';

export function withDispatchContext<
    P extends { dispatchers: Dispatchers },
    R = Omit<P, 'dispatchers'>
>(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.FunctionComponent<R> {
    return function BoundComponent(props: R) {
        const ShittyComponent = Component as any;
        return (
            <DispatchContext.Consumer>
                {dispatchers => <ShittyComponent {...props} dispatchers={dispatchers} />}
            </DispatchContext.Consumer>
        );
    };
}