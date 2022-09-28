import React, { Component } from 'react';
import InquiriesContextProvider, { InquiriesContext } from '../contexts/inquiriesContext';
import "../stylesheets/show.scss";
import MessageCard from './components/messageCard';

class InquiriesShowView extends Component {
  state = {  } 

  componentDidMount(){
    var content = document.querySelector("#inquiries-show-page .content")
    var contentHeight = content.clientHeight
    content.scrollTop += contentHeight
  }

  render() { 
    return (
      <InquiriesContextProvider>
        <div id="inquiries-show-page" className='page-container'>
          <div className="header">
            <InquiriesContext.Consumer>{context => {
              const { inquiry } = context

              if(inquiry === null) return 

              return (
                <h1 className="title">{inquiry.subject}</h1>
              )
            }}</InquiriesContext.Consumer>
          </div>
          <div className="content">
            <InquiriesContext.Consumer>{context => {
              const { messages, inquiry } = context

              return (
                <React.Fragment>
                  {messages.map(message => 
                    <MessageCard key={message.id} side={message.userType === "Admin" ? "right" : "left"} message={message} company={inquiry.company} /> 
                  )}
                </React.Fragment>
              )
            }}</InquiriesContext.Consumer>
          </div>
          <div className="footer d-flex justify-content-center">
            <InquiriesContext.Consumer>{context => {
              const { submitMessage } = context

              return (
                <React.Fragment>
                  <div className="form-group">
                    <input type="text" name="message" id="message" className='form-control' placeholder='Send Message ...' onKeyUp={submitMessage}/>
                  </div>
                  <button className="btn btn-primary btn-sm" id='send' onClick={submitMessage}>Send</button>
                </React.Fragment>
              )
            }}</InquiriesContext.Consumer>
          </div>
        </div>
      </InquiriesContextProvider>
    );
  }
}
 
export default InquiriesShowView;