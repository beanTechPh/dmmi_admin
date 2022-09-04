import React, { createContext, Component } from 'react';
import Branch from '../../../core/models/branch';
import Company from '../../../core/models/company';
import Equipment from '../../../core/models/equipment';
import ProductType from '../../../core/models/productType';
import { getFetch, postFetch } from '../../../core/network/fetchData';

export const EquipmentsContext = createContext();

class EquipmentsContextProvider extends Component {
  state = { 
    equipments: [],
    equipmentsPage: 1,
    equipmentsTotalPage: 1,
    types: [],
    branches: [],
    showEquipment: null,
    companies: [],
    productTypes: []
   } 

  getData (config) {
    if (config === undefined){
      config = {} 
    }

    var page = config.page === undefined ? 1 : config.page 
    var keyword = config.keyword === undefined ? "" : config.keyword
    var type_filter = config.type_filter === undefined ? "" : config.type_filter
    var origin_filter = config.origin_filter === undefined ? "" : config.origin_filter
    var branch_filter = config.branch_filter === undefined ? "" : config.branch_filter

    config = {
      pathname: "/admin/equipments",
      data: {
        page: page,
        keyword: keyword,
        type_filter: type_filter,
        origin_filter: origin_filter,
        branch_filter: branch_filter
      },
      dataFunction: (data) => {
        var equipments = Equipment.rawDataToEquipments(data['equipments'])
        var equipmentsPage = data['pagination']['page']
        var equipmentsTotalPage = data['pagination']['total_page']
        var types = data['types']
        var branches = data['branches']
        
        this.setState({ equipments, equipmentsPage, equipmentsTotalPage, types, branches })
      },
      errorFunction: (error) => {
      }
    }

    getFetch(config)
  }

  getEquipment () {
    var id = window.location.pathname.split('/')[2]

    var config = {
      pathname: "/admin/equipments/" + id,
      data: {},
      dataFunction: (data) => {
        var showEquipment = Equipment.rawDataToEquipment(data['equipment'])
        
        this.setState({ showEquipment })
      },
      errorFunction: (error) => {
      }
    }

    getFetch(config)
  }

  getNew(config){
    if (config === undefined){
      config = {}
    }
    
    config = {
      pathname: "/admin/equipments/new",
      data: {
        company_id: config.companyId === undefined ? '' : config.companyId
      },
      dataFunction: (data) => {
        console.log(data)
        var companies = Company.rawDataToCompanies(data['companies'])
        var productTypes = ProductType.rawDataToProductTypes(data['product_types'])
        var branches = Branch.rawDataToBranches(data['branches'])
        
        this.setState({ companies, productTypes, branches })
      },
      errorFunction: (error) => {
      }
    }

    getFetch(config)
  }

  componentDidMount(){
    if(window.location.pathname.split('/')[2] === 'new'){
      this.getNew()
    }else if(window.location.pathname.split('/')[2] !== '' && window.location.pathname.split('/')[2] !== undefined){
      this.getEquipment()
    }else{
      this.getData();
    }
  }

  query = (config) => {
    config = {
      keyword: document.querySelector("input#search").value,
      type_filter: document.querySelector("select#type-filter").value,
      origin_filter: document.querySelector("select#origin-filter").value,
      branch_filter: document.querySelector("select#branch-filter").value,
      page: 1,
      ...config,
    }
    this.getData(config)
  }

  equipmentTableRowClick = (equipment) => {
    window.location.href = `/equipments/${equipment.id}`
  }


  ////// EQUIPMENT NEW
  companyPick = (e) => {
    var companyId = e.target.value

    this.getNew({ companyId: companyId })
  }

  createEquipment = () => {
    var isValid = true

    // text inputs
    var textInputs = ["#name", "#product-type", "#origin", "#installed-date", "#brand", "#company", "#branch", "#description"]
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
      name: document.querySelector("#name").value,
      product_type_id: document.querySelector("#product-type").value,
      origin: document.querySelector("#origin").value,
      installed_date: document.querySelector("#installed-date").value,
      brand: document.querySelector("#brand").value,
      branch_id: document.querySelector("#branch").value,
      description: document.querySelector("#description").value,
    }

    var config = {
      pathname: "/admin/equipments",
      data: data,
      dataFunction: (data) => {
        window.location.href = `/equipments`
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
      equipmentTableRowClick: this.equipmentTableRowClick,
      companyPick: this.companyPick,
      createEquipment: this.createEquipment
    }

    return (
      <EquipmentsContext.Provider value={value}>
        {this.props.children}
      </EquipmentsContext.Provider>
    );
  }
}
 
export default EquipmentsContextProvider;