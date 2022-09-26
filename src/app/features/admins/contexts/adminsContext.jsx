import React, { createContext, Component } from 'react';
import FlashManager from '../../../core/functions/flashManager';
import Admin from '../../../core/models/admin';
import { getFetch, postFetch } from '../../../core/network/fetchData';

export const AdminsContext = createContext();

class AdminsContextProvider extends Component {
  state = { 
    admins: [],
    adminsPage: 1,
    adminsTotalPage: 1,
   } 

  getData (config) {
    if (config === undefined){
      config = {} 
    }

    var page = config.page === undefined ? 1 : config.page 
    var keyword = config.keyword === undefined ? "" : config.keyword

    config = {
      pathname: "/admin/admins",
      data: {
        page: page,
        keyword: keyword,
      },
      dataFunction: (data) => {
        var admins = Admin.rawDataToAdmins(data['admins'])
        var adminsPage = data['pagination']['page']
        var adminsTotalPage = data['pagination']['total_page']
        
        this.setState({ admins, adminsPage, adminsTotalPage })
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

  addAdmin = () => {
    var isValid = true

    // text inputs
    var textInputs = ["#admin-add-modal #email"]
    for (let i = 0; i < textInputs.length; i++) {
      const id = textInputs[i];
      
      if(document.querySelector(id).value === ""){
        document.querySelector(id).classList.add('empty')
        isValid = false
        break
      }else if(document.querySelector(id).name === "email") {
        const validateEmail = (email) => {
          return String(email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
      
        if(validateEmail(document.querySelector(id).value) === null){
          document.querySelector(id).classList.add('empty')
          isValid = false
          break
        }else{
          document.querySelector(id).classList.remove('empty')
        }
      }else{
        document.querySelector(id).classList.remove('empty')
      }
    }

    if(!isValid){
      return false
    }

    // get form data
    var data = {
      email: document.querySelector("#admin-add-modal #email").value,
    }

    var config = {
      pathname: "/admin/admins",
      data: data,
      dataFunction: (data) => {
        FlashManager.setFlashSuccess("Invite Sent!")
        window.location.href = `/admins`
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
      addAdmin: this.addAdmin
    }

    return (
      <AdminsContext.Provider value={value}>
        {this.props.children}
      </AdminsContext.Provider>
    );
  }
}
 
export default AdminsContextProvider;