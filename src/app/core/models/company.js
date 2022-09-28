import { ApiUrl } from "../network/url"

class Company {
  constructor(id, name, address, email, logo){
    this.id = id 
    this.name = name 
    this.address = address
    this.email = email 
    this.logo = require("../images/company-icon.png") 

    if(logo !== undefined && logo !== null){
      this.logo = ApiUrl + logo
    }
  }

  static rawDataToCompany(rawData){
    return new Company(rawData['id'], rawData['name'], rawData['address'], rawData['email'], rawData['logo'])
  }

  static rawDataToCompanies(rawData){
    return rawData.map(raw => Company.rawDataToCompany(raw))
  }
}

export default Company;