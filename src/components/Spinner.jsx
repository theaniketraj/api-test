import React, { Component } from 'react';
import loadingGif from './index.svg'; // Rename 'index' to something meaningful

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-4">
        <img src={loadingGif} alt="Loading..." style={{ width: '50px' }} />
      </div>
    );
  }
}

export default Spinner;