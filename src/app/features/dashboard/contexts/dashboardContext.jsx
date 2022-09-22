import React, { createContext, Component } from 'react';
import Admin from '../../../core/models/admin';
import { getFetch, postFetch } from '../../../core/network/fetchData';

export const DashboardContext = createContext();

class DashboardContextProvider extends Component {
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
    // this.getData();
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
      <DashboardContext.Provider value={value}>
        {this.props.children}
      </DashboardContext.Provider>
    );
  }
}
 
export default DashboardContextProvider;