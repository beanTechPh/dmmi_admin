import React, { Component } from 'react';
import '../stylesheets/loading.scss';

class Loading extends Component {
  state = {  } 
  render() { 
    return (
      <div id="loading-page" className='hide'>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}
 
export default Loading;