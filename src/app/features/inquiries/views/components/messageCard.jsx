import React from 'react';
import "../../stylesheets/messageCard.scss";

const MessageCard = (props) => {
  const { message, side, company } = props;

  return (
    <div className={"message-card d-flex " + side}>
      <div className="user-image">
        <img src={side === "right" ? require("../../../../core/images/logo.png") : company.logo} alt="" />
      </div>
      <div className="content custom-card">
        <p>{message.body}</p>
        <div className="date">{message.date}</div>
      </div>
    </div>
  )
}

export default MessageCard;