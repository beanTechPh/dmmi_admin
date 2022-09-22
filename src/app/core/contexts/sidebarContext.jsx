import React, { createContext, Component } from 'react';
import { deleteFetch } from '../network/fetchData';

export const SidebarContext = createContext();

class SidebarContextProvider extends Component {
  state = { 
  } 

  logout = (e) => {
    const config = {
      pathname: "/admin/admin_auth/sign_out",
      data: {},
      dataFunction: (data) => {
        window.location.href = `/sign_in`
      }
    }

    deleteFetch(config)
  }

  render() { 
    const value = {
      ...this.state,
      logout: this.logout
    }

    return (
      <SidebarContext.Provider value={value}>
        {this.props.children}
      </SidebarContext.Provider>
    );
  }
}
 
export default SidebarContextProvider;