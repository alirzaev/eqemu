import * as React from 'react';

import './index.css';

interface IProps {
    even: boolean;
}

export class HorizontalLayout extends React.PureComponent<IProps> {
    render() {
        return (
            <div className={`horizontal-layout ${this.props.even ? 'horizontal-layout-even' : ''}`}>
                {this.props.children}
            </div>
        );
    }
}
