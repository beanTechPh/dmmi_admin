import React, { createContext, Component } from 'react';
import FlashManager from '../../../core/functions/flashManager';
import Branch from '../../../core/models/branch';
import Company from '../../../core/models/company';
import Equipment from '../../../core/models/equipment';
import ProductType from '../../../core/models/productType';
import { getFetch, postFetch } from '../../../core/network/fetchData';

export const EmployeesContext = createContext();

class EmployeesContextProvider extends Component {
  state = { 
    equipments: [],
    equipmentsPage: 1,
    equipmentsTotalPage: 1,
   } 

  getData (config) {
    if (config === undefined){
      config = {} 
    }

    var page = config.page === undefined ? 1 : config.page 
    var keyword = config.keyword === undefined ? "" : config.keyword
    var type_filter = config.type_filter === undefined ? "" : config.type_filter
    // var origin_filter = config.origin_filter === undefined ? "" : config.origin_filter
    var branch_filter = config.branch_filter === undefined ? "" : config.branch_filter
    var brand_filter = config.brand_filter === undefined ? "" : config.brand_filter

    config = {
      pathname: "/admin/equipments",
      data: {
        page: page,
        keyword: keyword,
        type_filter: type_filter,
        // origin_filter: origin_filter,
        branch_filter: branch_filter,
        brand_filter: brand_filter
      },
      dataFunction: (data) => {
        var equipments = Equipment.rawDataToEquipments(data['equipments'])
        var equipmentsPage = data['pagination']['page']
        var equipmentsTotalPage = data['pagination']['total_page']
        var types = data['types']
        var branches = data['branches']
        var brands = data['brands']
        
        this.setState({ equipments, equipmentsPage, equipmentsTotalPage, types, branches, brands })
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
      type_filter: document.querySelector("select#type-filter").value,
      // origin_filter: document.querySelector("select#origin-filter").value,
      brand_filter: document.querySelector("select#brand-filter").value,
      branch_filter: document.querySelector("select#branch-filter").value,
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
      <EmployeesContext.Provider value={value}>
        {this.props.children}
      </EmployeesContext.Provider>
    );
  }
}
 
export default EmployeesContextProvider;