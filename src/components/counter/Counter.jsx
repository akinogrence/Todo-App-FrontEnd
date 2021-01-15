import React, { Component } from 'react'
import propTypes from "prop-types"
import CounterButton from './CounterButton'
import './Counter.css';

class Counter extends Component {

    state = { counter: 0 };
    constructor() {
        super();
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
        this.resetCounter    = this.resetCounter.bind(this);
    }
    render() {
        // const style = {fontSize : '50px' , padding: "15px 30px"};
        return (
            <div className="counter">
                <CounterButton incrementCounterMethod={this.incrementCounter} decrementCounterMethod={this.decrementCounter}></CounterButton>
                <CounterButton by={5} incrementCounterMethod={this.incrementCounter} decrementCounterMethod={this.decrementCounter}></CounterButton>
                <CounterButton by={10} incrementCounterMethod={this.incrementCounter} decrementCounterMethod={this.decrementCounter}></CounterButton>
                <CounterButton by={100} incrementCounterMethod={this.incrementCounter} decrementCounterMethod={this.decrementCounter}></CounterButton>
                <span>{this.state.counter}</span>
                <div><button onClick
                ={this.resetCounter}>RESET</button> </div>
            </div>
        );
    }

    incrementCounter(by) {
        this.setState(
            (prevState) => {
                return { counter: prevState.counter + by }
            });
    }
    decrementCounter(by) {
        this.setState(
            (prevState) => {
                return { counter: prevState.counter - by }
            });
    }
    resetCounter() {
        this.setState(
            (prevState) => {
                return {counter : 0}
            });
    }
}

CounterButton.defaultProps = { by: 1 }
CounterButton.propTypes = { by: propTypes.number }


export default Counter;