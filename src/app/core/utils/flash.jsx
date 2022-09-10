import React from 'react';
import FlashManager from '../functions/flashManager';
import '../stylesheets/flash.scss';

const FlashComponent = () => {
  const closeFlash = (e) => {
    var flash = e.target.closest(".flash")
    flash.classList.add('close')
    setTimeout(function() {
      flash.classList.add('to-back')
    }, 300);
    FlashManager.removeFlash()
  }

  var flashes = FlashManager.getFlash()

  return (
    <React.Fragment>
      <div className={'flash ' + (flashes["flash-success"] ==="" ? "close to-back" : "")} id="flash-success">
        <div className="content">{flashes["flash-success"]}</div>
        <div className="close-icon">
          <i className="bi bi-x-lg" onClick={closeFlash}></i>
        </div>
      </div>
      <div className={'flash ' + (flashes["flash-error"] ==="" ? "close to-back" : "")}  id="flash-error">
        <div className="content">{flashes["flash-error"]}</div>
        <div className="close-icon">
          <i className="bi bi-x-lg" onClick={closeFlash}></i>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FlashComponent;