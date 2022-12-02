import React from 'react';
import Dropdown from './Dropdown';
import SubmitCard from './SubmitCard';
import AddButton from './AddButton';
import NavBar from './NavBar'

interface IProps {
}

interface IState {
    countries: ICountry[];
    states: ICountryState[];
    hidden: boolean;
    chooseType: string;
    selectedCountryCode: number;
}

interface ICountry {
    id: number;
    code: string;
    name: string;
}

interface ICountryState {
    id: number;
    code: string;
    name: string;
    countryCode: string;
}

class Body extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            countries: [],
            states: [],
            hidden: false,
            chooseType: "countryButton",
            selectedCountryCode: -1
        }
    }

    async componentDidMount() {
        const response = await fetch("https://xc-countries-api.herokuapp.com/api/countries/");
        const data = await response.json();
        this.setState({countries: data});
        data.sort((a:any, b:any) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return -1;
        });
    }

    getCountry = (id: any) => {
        return this.state.countries.filter((item) => item.id = id);
        //return this.state.countries.filter((item) => item.code === code.toUpperCase())[0];
    }

    setCountry = (code: any) => {
        this.requestStates(code);
    }

    handleChange = (e: any) => {
        this.requestStates(e.target.value);
    }

    handleClick = (e: any) => {
        this.setState({
            hidden: true,
            chooseType: e.target.id
        });
    }

    handleQuit = () => {
        this.setState({
            hidden: false
        });
    }

    async requestStates(code: any) {
        const response = await fetch(`https://xc-countries-api.herokuapp.com/api/countries/${code}/states/`);
        const data = await response.json();
        this.setState({states: data});
        data.sort((a:any, b:any) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }
            return -1;
        });
    }

    render() {
        var countryOptions = this.state.countries.map((country) => {
            return {text: country.name, value: country.code};
        })

        var stateOptions = this.state.states.map((stat) => {
            return {text: stat.name, value: stat.code};
        })

        var countryCodes: any[] = [];
        this.state.countries.forEach(country => countryCodes.push(country.code));
        
        var stateCodes: any[] = [];
        this.state.states.forEach(stat => stateCodes.push(stat.code));

        return (
            <div>
                <div className={this.state.hidden ? "divCardBlurred" : "divCard"}>
                    <NavBar />
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div id="div1"><p>Choose your Country: </p></div>
                                </td>
                                <td>
                                    <div id="div2"><Dropdown onChange={this.handleChange} options={countryOptions}/></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="div1"><p>Choose your State: </p></div>
                                </td>
                                <td>
                                    <div id="div2"><Dropdown options={stateOptions}/></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <AddButton value="country" onClick={this.handleClick}/>
                                </td>
                                <td>
                                    <AddButton value="state" onClick={this.handleClick}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <SubmitCard id="submitcard" 
                            setCountry={this.setCountry} 
                            getCountry={this.getCountry} 
                            options={countryOptions} 
                            hidden={this.state.hidden} 
                            codes={this.state.chooseType === "countryButton" ? countryCodes : stateCodes} 
                            type={this.state.chooseType} class="submitCard" onQuit={this.handleQuit}  />
            </div>
        );
    }
}
export default Body;
