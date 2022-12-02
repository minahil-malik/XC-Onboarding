import React from 'react';
import './SubmitCard.css';
import Dropdown from './Dropdown';

interface IProps {
    type: any;
    codes: any;
    disabled?: any;
    value?: any;
    id?: string;
    getCountry: any;
    setCountry: any;
    options: any;
    hidden: boolean;
    class: string;
    onQuit: () => void;
}

interface IState {
    name: string;
    code: string;
    countryId: any;
}

class SubmitCard extends React.Component<IProps, IState> {
    constructor(props:any) {
        super(props);
        this.state = {
            name: "",
            code: "",
            countryId: null
        };
    }

    type() { //method returns a formatted string, either "country" or "state"
        return this.props.type.slice(0, -6);
    }

    nameMaker() { //more formatting, returns with string with uppercase first letter
        var name = this.type();
        name = name[0].toUpperCase() + name.slice(1);
        return name;
    }

    /*
    method checks if inputted code already exists;
    if code already exists, submit button is locked and displays error message
    */
    checkCode(code:any) {
        for(var i = 0; i < this.props.codes.length; i++) {
            if(code.toUpperCase() === this.props.codes[i].toUpperCase()) {
                document.getElementById("code-input")!.style.outline = "3px solid red";
                document.getElementById("error-text")!.style.display = "block";
                document.getElementById("submit-button")!.style.backgroundColor = "#976968";
                document.getElementById("submit-button")!.style.pointerEvents = "none";
                return false;
            }
        }
        document.getElementById("code-input")!.style.outline = "none";
        document.getElementById("error-text")!.style.display = "none";
        return true;
    }

    /*
    checks if user filled out all info, locks submit button if they haven't
    */
    checkIfFormComplete() {
        /*if(this.type() === "state") {
            if(this.state.countryId != null) {
                (document.getElementById("code-input") as any).disabled = false;
            }
            else {
                (document.getElementById("code-input") as any).disabled = true;
            }
        }
        else {
            (document.getElementById("code-input") as any).disabled = false;
        }*/

        if(this.state.name !== "" && this.state.code !== "") {
            document.getElementById("submit-button")!.style.backgroundColor = "#EE6C6C";
            document.getElementById("submit-button")!.style.pointerEvents = "auto";
        }
        else {
            document.getElementById("submit-button")!.style.backgroundColor = "#976968";
            document.getElementById("submit-button")!.style.pointerEvents = "none";
        }
    }

    /*
    detects changes in two input boxes and will update their values; also passes code value to checkCode()
    to verify its usability before setting it to the state
    */
    handleChange = (e: any) => {
        var value = e.target.value;
        if(e.target.name === "code") {
            value = value.toUpperCase();
        }
        if(e.target.name === 'code') {
            if(this.checkCode(e.target.value)) {
                this.setState({...this.state, [e.target.name]: value}, this.checkIfFormComplete);
                //this.setState({[e.target.name]: value}, this.checkIfFormComplete)
            }
        }
        else {
            this.setState({...this.state, [e.target.name]: e.target.value}, this.checkIfFormComplete);
            //this.setState({[e.target.name]: e.target.value}, this.checkIfFormComplete)
        }
    }

    /*
    gets new list of states when the country is selected or changed so post goes to the correct country
    */
    handleCountryChange = (e: any) => {
        var value = e.target.value;
        this.props.setCountry(value);
        this.setState({countryId: this.props.getCountry(value)}, this.checkIfFormComplete);
        //this.setState({countryId: this.props.getCountry(value).id}, this.checkIfFormComplete);
        this.setState({code: ""});
        (document.getElementById("code-input") as any).value = "";
        this.checkCode("");
    }

    /*
    runs when submit button is pressed, creates newPost object to be posted to the server
    */
    handleSubmit = (e:any) => {
        e.preventDefault();
        var newPost = {};

        if(this.type() === "country") {
            newPost = {
                name: this.state.name,
                code: this.state.code
            }
        }
        else {
            newPost = {
                name: this.state.name,
                code: this.state.code,
                countryId: this.state.countryId
            }
        }
        this.postNewObject(newPost);
    }

    /*
    formats POST url depending on if the user makes a country or state
    */
    urlMaker() {
        var urlString = `https://xc-countries-api.herokuapp.com/api/${this.type() === "country" ? "countries" : "states"}/`;
        //var urlString = `http://xc-countries-api.herokuapp.com/api/states/`;
        return urlString;
    }

    /*
    makes the POST to the server using urlMaker(), turns parameter object into JSON format;
    exists SubmitCard window
    */
    async postNewObject(newPost: any) {
        console.log(newPost);
        fetch(this.urlMaker(), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(newPost)
        });
        this.props.onQuit();
    }

    render() {
        return (
            <div className={this.props.hidden ? "style2": "style1"}>
                <div>It's time to create a {this.nameMaker()}!</div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tbody>
                                <tr className={this.type() === "country" ?  "style1" : "style3"}>
                                    <td className="submitCell">Country: </td>
                                    <td><Dropdown onChange={this.handleCountryChange} options={this.props.options}/></td>
                                </tr> 
                                <tr>
                                    <td className="submitCell">
                                        Name: 
                                    </td>
                                    <td className="submitCell">
                                        <input type="text" name="name" onChange={this.handleChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="submitCell">
                                        Code: 
                                    </td>
                                    <td>
                                        <input id="code-input" type="text" name="code" onChange={this.handleChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="errorTextStyle" id="error-text">
                                        Error: Code already taken
                                    </td>
                                </tr>
                                <tr>
                                    <td className="submitCell">
                                        <input className="disabledButtonStyle" id="submit-button" type="submit" value="Submit" onChange={() => {}}/>
                                    </td>
                                    <td className="submitCell">
                                        <input className="buttonStyle" id="quit-button" type="button" onClick={this.props.onQuit} value="Quit" onChange={() => {}}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        )
    }
}

export default SubmitCard;