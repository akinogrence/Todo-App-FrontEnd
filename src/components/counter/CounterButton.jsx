import React, { Component } from 'react'
/* import PropTypes from "prop-types" */
import './Counter.css';
class CounterButton extends Component {

    
/*     constructor() {
        super();
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this); 
    } */

    render() {
        // const style = {fontSize : '50px' , padding: "15px 30px"};
        return (
            <div className="counterButtonSet">
                <button onClick={()=> this.props.incrementCounterMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={()=> this.props.decrementCounterMethod(this.props.by)}>-{this.props.by}</button>
                {/*<span
                    style={style} 
                className="counter">{this.state.counter}</span>*/}
            </div>
        );
    }

   

   /*  incrementCounter() {  
        this.props.incrementCounterMethod(this.props.by); 
    }

    decrementCounter() {   
        this.props.decrementCounterMethod(this.props.by); 
    } */
    
}



export default CounterButton;