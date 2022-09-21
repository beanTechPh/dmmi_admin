import React from 'react';

const ComponentCard = (props) => {
  const { component } = props;

  return (
    <div className="custom-card component-card">
      <div className="image">
        <img src={component.image} alt="" />
      </div>
      <div className="details">
        <div className="group">
          <div className="value">{component.name}</div>
          <div className="label">NAME</div>
        </div>
        <div className="d-flex justify-content-evenly">
          <div className="group">
            <div className="value">{component.brand}</div>
            <div className="label">BRAND</div>
          </div>
          <div className="group">
            <div className="value">{component.qty}</div>
            <div className="label">QTY</div>
          </div>
        </div>
        <div className="group description">
          <div className="label">DESCRIPTION</div>
          <div className="value">{component.description}</div>
        </div>
      </div>
    </div>
  )
}

export default ComponentCard;