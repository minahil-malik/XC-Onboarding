import React from 'react';
import {DropdownOption} from './DropdownOption';

interface IProps {
    options: { text: string; value: any; }[];
    //onChange?: () => {};
    onChange?: any;
}

interface IState {
}

class Dropdown extends React.Component<IProps, IState> {
    render() {
        let options = [];

        options = this.props.options.map((item: any) => {
            return <DropdownOption key={item.value} item={item} />;
        });

        return (
            <select onChange={this.props.onChange}>
                <option value="">Select your option</option>
                {options}
            </select>
        );
    }
}
export default Dropdown;