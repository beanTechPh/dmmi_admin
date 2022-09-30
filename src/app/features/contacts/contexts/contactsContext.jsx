import React, { createContext, Component } from 'react';
import Contact from '../../../core/models/contact';
import { getFetch, postFetch } from '../../../core/network/fetchData';

export const ContactsContext = createContext();

class ContactsContextProvider extends Component {
  state = { 
    contacts: [],
    contactsPage: 1,
    contactsTotalPage: 1,
   } 

  getData (config) {
    if (config === undefined){
      config = {} 
    }

    var page = config.page === undefined ? 1 : config.page 
    var keyword = config.keyword === undefined ? "" : config.keyword

    config = {
      pathname: "/admin/contacts",
      data: {
        page: page,
        keyword: keyword,
      },
      dataFunction: (data) => {
        var contacts = Contact.rawDataToContacts(data['contacts'])
        var contactsPage = data['pagination']['page']
        var contactsTotalPage = data['pagination']['total_page']
        
        this.setState({ contacts, contactsPage, contactsTotalPage })
      },
      errorFunction: (error) => {
      }
    }

    getFetch(config)
  }

  componentDidMount(){
    this.getData();
  }

  query = (config) => {
    config = {
      keyword: document.querySelector("input#search").value,
      page: 1,
      ...config,
    }
    this.getData(config)
  }

  render() { 
    var value = {
      ...this.state,
      query: this.query,
    }

    return (
      <ContactsContext.Provider value={value}>
        {this.props.children}
      </ContactsContext.Provider>
    );
  }
}
 
export default ContactsContextProvider;