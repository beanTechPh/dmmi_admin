import React, { Component } from 'react';
import '../stylesheets/modal.scss';

class Modal extends Component {
  state = {  } 

  closeModal = (e) => {
    var modal = e.target 

    if(modal.classList.contains("close-icon") || modal.classList.contains("icon")){
      while (!modal.classList.contains("c-modal")) {
        modal = modal.parentElement
      }
    }else if(!modal.classList.contains("c-modal")){
      return
    }
  
    modal.classList.add('hide')
    modal.querySelector(".content").classList.remove('hide')
    modal.querySelector('.success-content').classList.add('hide')
    modal.querySelector('.error-content').classList.add('hide')

    // reset form
    if(modal.querySelector("form") != null) {
      modal.querySelector("form").reset()
    }
  }

  render() { 
    var isHide = this.props.isHide === undefined ? true : this.props.isHide
    
    return (
      <div id={this.props.id} className={'c-modal ' + (isHide ? 'hide' : '')} type='button' onClick={this.closeModal}>
        <div className="c-modal-content">
          <div className="header">
            <div className="title">{this.props.title}</div>
            <div className="close-icon" type='button' onClick={this.closeModal}>
              <i className="bi bi-x-lg icon"></i>
            </div>
          </div>
          <div className="content">
            {this.props.children}
          </div>
          <div className="success-content hide">
            <div className="icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <div className="label">Success!</div>
          </div>
          <div className="error-content hide">
            <div className="icon">
              <i className="bi bi-x-circle-fill"></i>
            </div>
            <div className="label">Error!</div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Modal;