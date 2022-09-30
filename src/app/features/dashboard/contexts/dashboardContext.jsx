import React, { createContext, Component } from 'react';
import Admin from '../../../core/models/admin';
import { getFetch, postFetch } from '../../../core/network/fetchData';

export const DashboardContext = createContext();

class DashboardContextProvider extends Component {
  state = { 
   } 

  getData (config) {
    if (config === undefined){
      config = {} 
    }

    var page = config.page === undefined ? 1 : config.page 
    var keyword = config.keyword === undefined ? "" : config.keyword

    config = {
      pathname: "/admin/dashboard",
      data: {
        page: page,
        keyword: keyword,
      },
      dataFunction: (data) => {
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
      <DashboardContext.Provider value={value}>
        {this.props.children}
      </DashboardContext.Provider>
    );
  }
}
 
export default DashboardContextProvider;