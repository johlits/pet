import Button from 'react-bootstrap/Button';
import React from 'react';

interface StatProps {
    name: string;
    action: string;
    timer: number;
    disabled: boolean;
    parentCallback: any;
}

type StatState = {
    value: number,
    seconds: number,
    disabled: boolean
};

export default class Stat extends React.Component<StatProps, StatState> {

    interval: any;

    constructor(props: any) {
        super(props)
        this.state = { value: 100, seconds: 0, disabled: this.props.disabled };
    }
    Increment = () => {
        this.setState({ value: this.state.value + 1 });
        this.sendData({ key: this.props.name, value: this.state.value, change: 1 });
    }
    Decrement = () => {
        this.setState({ value: this.state.value - 1 });
        this.sendData({ key: this.props.name, value: this.state.value, change: -1 });
    }

    tick() {
        if (this.state.seconds >= this.props.timer) {
            this.setState(state => ({
                seconds: 0
            }));
            if (this.state.disabled && this.props.name === 'Energy' && this.state.value < 100) {
                this.Increment();
            }
            else {
                this.Decrement();
            }
        }
        else {
            this.setState(state => ({
                seconds: state.seconds + 1
            }));
        }
    }

    sendData = (s: any) => {
        this.props.parentCallback(s);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps: { disabled: any }) {
        if (prevProps.disabled !== this.props.disabled) {
            this.setState({ disabled: this.props.disabled });
        }
    }

    render() {
        return <p>{this.props.name} : {this.state.value} <Button onClick={this.Increment} disabled={this.state.disabled || this.state.value >= 100}>{this.props.action}</Button></p>;
    }
}
