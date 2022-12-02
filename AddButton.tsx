import React from "react";
import './AddButton.css';

interface IProps {
    value: any;
    onClick: any;
}

interface IState {
}

class AddButton extends React.Component<IProps, IState>{
    constructor(props:any){
        super(props);
        this.nameMaker = this.nameMaker.bind(this);
    }

    nameMaker(){
        var name = this.props.value;
        name = "Add " + name[0].toUpperCase() + name.slice(1);
        return name;
    }

    render(){
        return (
            <div className="style" id={this.props.value + "Button"} onClick={this.props.onClick}>
                <p>{this.nameMaker()}</p>
            </div>
        );
    }
}

export default AddButton;