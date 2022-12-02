import { render } from '@testing-library/react';
import React from 'react';

interface IProps {
}

interface IState {
    countries: ICountry[];
    states: ICountryState[];
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
        }
    }

    async componentDidMount() {
        const response = await fetch("https://xc-countries-api.herokuapp.com/api/countries/");
        const data = await response.json();

        this.setState({countries: data});
    }

    getCountry = (code: any) => {
        return this.state.countries.filter((country: any) => country.code);
    }

    setCountry = (code: any) => {
        this.requestStates(code);
    }

    handleChange = (e: any) => {
        this.requestStates(e.target.value);
    }

    async requestStates(code: any) {
        const response = await fetch(`https://xc-countries-api.herokuapp.com/api/countries/${code}/states/`);
        const data = await response.json();
        this.setState({states: data});
    }

    render() {
        var countryOptions = this.state.countries.map((country) => {
            return {text: country.name, value: country.code};
        })

        var stateOptions = this.state.states.map((stat) => {
            return {text: stat.name, value: stat.code};
        })

        var countryCodes = [];
        this.state.countries.forEach(country => countryCodes.push(country.code));
        
        var stateCodes = [];
        this.state.states.forEach(stat => stateCodes.push(stat.code));

        return (
            <div>
                Hi
            </div>
        )
    }
}
export default Body;
