import React, { Component } from 'react';

class ThirdComponent extends Component {
  render() {
    return (
      <div className="thirdComponent">
        ThirdComponentDiv
      </div>
    );
  }
}

export function ThirdComponentFromFunction() {
  return (
    <div className="componentFromFunction">
      ComponentFromFunction
    </div>
  );
}

export default ThirdComponent;


