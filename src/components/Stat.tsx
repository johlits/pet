import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React from "react";

interface StatProps {
  name: string;
  action: string;
  disabled: boolean;
  parentCallback: any;
  pid: number;
  val: number;
}

type StatState = {
  value: number;
  seconds: number;
  disabled: boolean;
};

export default class Stat extends React.Component<StatProps, StatState> {
  interval: any;

  constructor(props: any) {
    super(props);
    this.state = {
      value: props.val,
      seconds: 0,
      disabled: this.props.disabled,
    };
  }
  Increment = (amount: number) => {
    if (this.state.value < 100) {
      let val = Math.min(this.state.value + amount, 100);
      this.setState({ value: val });
      this.sendData({ key: this.props.name, value: val, change: 1 });
    }
  };
  Decrement = (amount: number) => {
    if (this.state.value > 0) {
      let val = this.state.value - amount;
      this.setState({ value: val });
      this.sendData({ key: this.props.name, value: val, change: -1 });
    }
  };

  tick() {
    if (this.state.seconds >= 8) {
      this.setState((state) => ({
        seconds: 0,
      }));
      if (
        this.state.disabled &&
        this.props.name === "Energy" &&
        this.state.value < 100
      ) {
        this.Increment(2);
      } else {
        this.Decrement(1);
      }
    } else {
      this.setState((state) => ({
        seconds: state.seconds + 1,
      }));
    }
  }

  sendData = (s: any) => {
    this.props.parentCallback(s);
  };

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
    this.setState({ value: this.props.val });
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
    return (
      <Row className="mb-1 mt-1">
        <Col xs={4}>{this.props.name}</Col>
        <Col xs={4}>{this.state.value}</Col>
        <Col xs={4}>
          <Button
            variant="secondary"
            onClick={() => this.Increment(1)}
            disabled={this.state.disabled || this.state.value >= 100}
          >
            {this.props.action}
          </Button>
        </Col>
      </Row>
    );
  }
}
