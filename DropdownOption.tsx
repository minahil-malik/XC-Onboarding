import React from 'react';

interface IProps {
    item: any;
}

interface IState {
}

export class DropdownOption extends React.Component<IProps, IState> {
    render() {
        return (
            <option value={this.props.item.value}>{this.props.item.text}</option>
        );
    }
}