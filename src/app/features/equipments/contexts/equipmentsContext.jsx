import React, { createContext, Component } from 'react';
import FlashManager from '../../../core/functions/flashManager';
import { textValidation } from '../../../core/functions/validation';
import Branch from '../../../core/models/branch';
import Company from '../../../core/models/company';
import EquipComponent from '../../../core/models/equipComponent';
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
    productTypes: [],
    brands: [],
    newComponents: []
   } 

  getData (config) {
    if (config === undefined){
      config = {} 
    }

    var page = config.page === undefined ? 1 : config.page 
    var keyword = config.keyword === undefined ? "" : config.keyword
    var type_filter = config.type_filter === undefined ? "" : config.type_filter
    var branch_filter = config.branch_filter === undefined ? "" : config.branch_filter
    var brand_filter = config.brand_filter === undefined ? "" : config.brand_filter

    config = {
      pathname: "/admin/equipments",
      data: {
        page: page,
        keyword: keyword,
        type_filter: type_filter,
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

  getEquipment () {
    var id = window.location.pathname.split('/')[2]

    var config = {
      pathname: "/admin/equipments/" + id,
      data: {},
      dataFunction: (data) => {
        var showEquipment = Equipment.rawDataToEquipment(data['equipment'])
        
        this.setState({ showEquipment })
        this.getNew({companyId: showEquipment !== null ? showEquipment.branch.companyId : ''})
        document.querySelector("#is-from-dmmi").checked = showEquipment.brand === "DMMI"
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
      document.querySelector("#is-from-dmmi").checked = true
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
      brand_filter: document.querySelector("select#brand-filter").value,
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
    var textInputs = ["#name", "#product-type", "#installed-date", "#company", "#branch", "#description"]

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

    // Validate images
    var _validFileExtensions = [".jpg", ".jpeg", ".png"];
    var sFileName = document.querySelector("input#images").value;
    if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];
            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                blnValid = true;
                break;
            }
        }
        
        if (!blnValid) {
            FlashManager.setInstantFlashError("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "))
            return false;
        }
    }

    // validate schematics
    var sFileName = document.querySelector("input#schematics").value;
    if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];
            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                blnValid = true;
                break;
            }
        }
        
        if (!blnValid) {
            FlashManager.setInstantFlashError("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "))
            return false;
        }
    }

    // validate documentation
    var _documValidFileExtensions = [".pdf"];
    var sFileName = document.querySelector("input#documentation").value;
    if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _documValidFileExtensions.length; j++) {
            var sCurExtension = _documValidFileExtensions[j];
            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                blnValid = true;
                break;
            }
        }
        
        if (!blnValid) {
            FlashManager.setInstantFlashError("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _documValidFileExtensions.join(", "))
            return false;
        }
    }

    // validate components
    this.state.newComponents.forEach(component => {
      var componentCard = document.querySelector("#component-" + component.id)
      var inputs = ["input[name='comp-name']", "input[name='comp-brand']", "input[name='comp-qty']", "input[name='comp-description']"]

      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        // validate image
        var sFileName = componentCard.querySelector("input[name='image']").value;
        if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
            
            if (!blnValid) {
                FlashManager.setInstantFlashError("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "))
                return false;
            }
        }

        if(componentCard.querySelector(input).value === ""){
          componentCard.querySelector(input).classList.add('empty')
          isValid = false
          break
        }else{
          componentCard.querySelector(input).classList.remove('empty')
        }
      }
    });

    if(!isValid){
      return false
    }

    // get components
    var components = []
    this.state.newComponents.forEach(component => {
      var componentCard = document.querySelector("#component-" + component.id)

      components.push({
        image: componentCard.querySelector("input[name='image']").files[0],
        name: componentCard.querySelector("input[name='comp-name']").value,
        brand: componentCard.querySelector("input[name='comp-brand']").value,
        qty: componentCard.querySelector("input[name='comp-qty']").value,
        description: componentCard.querySelector("input[name='comp-description']").value,
      })
    });

    // get form data
    var checkbox = document.querySelector("#is-from-dmmi") 
    var brandValue = "existing"
    var images = Array.from(document.querySelector("input#images").files);
    var schematics = Array.from(document.querySelector("input#schematics").files);
    var documentation = document.querySelector("input#documentation").files[0];
    var installed_date = new Date(document.querySelector("#installed-date").value)
    
    if(checkbox.checked){
      brandValue = "dmmi"
    }else if(document.querySelector("#brand").value !== ""){
      brandValue = document.querySelector("#brand").value
    }

    var data = {
      name: document.querySelector("#name").value,
      product_type_id: document.querySelector("#product-type").value,
      installed_date: installed_date,
      brand: brandValue,
      branch_id: document.querySelector("#branch").value,
      description: document.querySelector("#description").value,
      images: images,
      schematics: schematics,
      documentation: documentation,
      components: components
    }

    var config = {
      pathname: "/admin/equipments",
      data: data,
      dataFunction: (data) => {
        FlashManager.setFlashSuccess("Successfully added New Equipment!")
        window.location.href = `/equipments`
      },
      errorFunction: (error) => {
      }
    }
    postFetch(config)
  }

  onCheckFromDMMI = (e) => {
    var checkbox = e.target 
    
    var brandInput = document.querySelector("input#brand");
    var brandFormGroup = brandInput.parentElement

    brandInput.value = ""
    if(checkbox.checked){
      brandFormGroup.classList.add('hide')
    }else{
      brandFormGroup.classList.remove('hide')
    }
  }

  addComponent = (e) => {
    var { newComponents } = this.state

    if(newComponents.length === 0){
      this.setState({ newComponents: [ EquipComponent.rawDataToEquipComponent({'id': 1}) ]})
    }else{
      var lastId = newComponents[newComponents.length - 1].id 

      this.setState({ newComponents: [...newComponents, EquipComponent.rawDataToEquipComponent({'id': lastId + 1}) ]})
    }
  }

  deleteComponent = (component) => {
    var newComponents = [...this.state.newComponents].filter(comp => comp.id !== component.id)

    this.setState({ newComponents })
  }


  ////// EQUIPMENT UPDATE DETAILS
  equipmentUpdateDetails = (e) => {
    e.preventDefault()
    var modal = document.querySelector("#equipment-edit-details-modal")

    // text inputs
    var textInputs = ["#name", "#product-type", "#installed-date", "#company", "#branch", "#description"]
    var isValid = textValidation(textInputs)

    if(!isValid){
      return false
    }

    // Validate images
    var _validFileExtensions = [".jpg", ".jpeg", ".png"];
    var sFileName = document.querySelector("input#images").value;
    if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];
            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                blnValid = true;
                break;
            }
        }
        
        if (!blnValid) {
            FlashManager.setInstantFlashError("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "))
            return false;
        }
    }

    // get form data
    var checkbox = document.querySelector("#is-from-dmmi") 
    var brandValue = "existing"
    var images = Array.from(document.querySelector("input#images").files);
    var installed_date = new Date(document.querySelector("#installed-date").value)
    
    if(checkbox.checked){
      brandValue = "dmmi"
    }else if(document.querySelector("#brand").value !== ""){
      brandValue = document.querySelector("#brand").value
    }

    var data = {
      id: this.state.showEquipment.id,
      name: document.querySelector("#name").value,
      product_type_id: document.querySelector("#product-type").value,
      installed_date: installed_date,
      brand: brandValue,
      branch_id: document.querySelector("#branch").value,
      description: document.querySelector("#description").value,
      images: images,
    }

    var config = {
      pathname: "/admin/equipments/update_details",
      data: data,
      dataFunction: (data) => {
        this.getEquipment()
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

  render() { 
    var value = {
      ...this.state,
      query: this.query,
      equipmentTableRowClick: this.equipmentTableRowClick,
      companyPick: this.companyPick,
      createEquipment: this.createEquipment,
      onCheckFromDMMI: this.onCheckFromDMMI,
      addComponent: this.addComponent,
      deleteComponent: this.deleteComponent,
      equipmentUpdateDetails: this.equipmentUpdateDetails
    }

    return (
      <EquipmentsContext.Provider value={value}>
        {this.props.children}
      </EquipmentsContext.Provider>
    );
  }
}
 
export default EquipmentsContextProvider;