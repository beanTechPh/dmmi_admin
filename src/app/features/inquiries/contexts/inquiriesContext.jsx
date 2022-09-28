import React, { createContext, Component } from 'react';
import { textValidation } from '../../../core/functions/validation';
import Company from '../../../core/models/company';
import Inquiry from '../../../core/models/inquiry';
import Message from '../../../core/models/message';
import { getFetch, postFetch } from '../../../core/network/fetchData';

export const InquiriesContext = createContext();

class InquiriesContextProvider extends Component {
  state = { 
    inquiries: [],
    inquiriesPage: 1,
    inquiriesTotalPage: 1,
    inquiry: null,
    companies: [],
    messages: [],
    messagesPage: 1,
  } 

  componentDidMount(){
    if(window.location.pathname.split('/')[2] !== '' && window.location.pathname.split('/')[2] !== undefined){
      this.getMessages()
    }else{
      this.getData();
    }
  }

  // INQUIRIES
  getData (config) {
    if (config === undefined){
      config = {} 
    }

    var page = config.page === undefined ? 1 : config.page 
    var keyword = config.keyword === undefined ? "" : config.keyword

    config = {
      pathname: "/admin/inquiries",
      data: {
        page: page,
        keyword: keyword,
      },
      dataFunction: (data) => {
        var inquiries = Inquiry.rawDataToInquiries(data['inquiries'])
        var inquiriesPage = data['pagination']['page']
        var inquiriesTotalPage = data['pagination']['total_page']
        var companies = Company.rawDataToCompanies(data['companies'])
        
        this.setState({ inquiries, inquiriesPage, inquiriesTotalPage, companies })
      },
      errorFunction: (error) => {
      }
    }

    getFetch(config)
  }

  query = (config) => {
    config = {
      keyword: document.querySelector("input#search").value,
      page: 1,
      ...config,
    }
    this.getData(config)
  }

  submitInquiry = (e) => {
    e.preventDefault()
    var isValid = true
    var modal = document.querySelector("#equipment-create-modal")

    // text inputs
    var textInputs = ["input[name='subject']", "select[name='company_id']", "textarea[name='body']"]
    isValid = textValidation(textInputs)

    if(!isValid){
      return false
    }

    // get form data
    var data = {
      body: document.querySelector("textarea[name='body']").value,
      subject: document.querySelector("input[name='subject']").value,
      company_id: document.querySelector("select[name='company_id']").value,
    }
    
    var config = {
      pathname: "/admin/inquiries",
      data: data,
      dataFunction: (data) => {
        this.query()
        modal.querySelector(".content").classList.add('hide')
        modal.querySelector(".error-content").classList.add('hide')
        modal.querySelector(".success-content").classList.remove('hide')
      },
      errorFunction: (error) => {
        modal.querySelector(".content").classList.add('hide')
        modal.querySelector(".error-content").classList.remove('hide')
        modal.querySelector(".success-content").classList.add('hide')
      }
    }
    postFetch(config)
  }

  inquiryTableRowClick = (inquiry) => {
    window.location.href = `/inquiries/${inquiry.id}`
  }

  // MESSAGES
  getMessages (config) {
    if (config === undefined){
      config = {} 
    }

    var page = config.page === undefined ? 1 : config.page 
    var inquiryId = window.location.pathname.split('/')[2]

    config = {
      pathname: "/admin/messages",
      data: {
        page: page,
        inquiry_id: inquiryId,
      },
      dataFunction: (data) => {
        var inquiry = Inquiry.rawDataToInquiry(data['inquiry'])
        var messages = Message.rawDataToMessages(data['messages'])
        var messagesPage = data['pagination']['page']
        
        this.setState({ messages, messagesPage, inquiry })
      },
      errorFunction: (error) => {
      }
    }

    getFetch(config)
  }

  submitMessage = (e) => {
    if(e.type === "keyup" && e.key !== "Enter") return 

    var input = document.querySelector("#inquiries-show-page #message")

    if(input.value === "") return 

    // get form data
    var data = {
      body: input.value,
      inquiry_id: this.state.inquiry.id,
    }
    
    var config = {
      pathname: "/admin/messages",
      data: data,
      dataFunction: (data) => {
        var messages = [...this.state.messages, Message.rawDataToMessage(data['message'])]
        input.value = ""

        this.setState({ messages })
      },
      errorFunction: (error) => {
      }
    }
    postFetch(config)
  }

  render() { 
    var value = {
      ...this.state,
      query: this.query,
      submitInquiry: this.submitInquiry,
      inquiryTableRowClick: this.inquiryTableRowClick,
      submitMessage: this.submitMessage
    }

    return (
      <InquiriesContext.Provider value={value}>
        {this.props.children}
      </InquiriesContext.Provider>
    );
  }
}
 
export default InquiriesContextProvider;