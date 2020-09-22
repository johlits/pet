import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import React from 'react';

var ls = require('local-storage');

interface StatProps {
    name: string;
    action: string;
    timer: number;
    disabled: boolean;
    parentCallback: any;
    pid: number;
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
        if (this.state.value < 100) {
            let val = this.state.value + 1;
            this.setState({ value: val });
            this.sendData({ key: this.props.name, value: val, change: 1 });
            ls.set(this.props.name + this.props.pid, val);
        }
    }
    Decrement = () => {
        if (this.state.value > 0) {
            let val = this.state.value - 1;
            this.setState({ value: val });
            this.sendData({ key: this.props.name, value: val, change: -1 });
            ls.set(this.props.name + this.props.pid, val);
        }
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
        this.setState({ value: ls.get(this.props.name + this.props.pid) || this.state.value });
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
        return <Row className="mb-1 mt-1"><Col xs={4}>{this.props.name}</Col><Col xs={4}>{this.state.value}</Col><Col xs={4}><Button variant="secondary" onClick={this.Increment} disabled={this.state.disabled || this.state.value >= 100}>{this.props.action}</Button></Col></Row>;
    }
}
