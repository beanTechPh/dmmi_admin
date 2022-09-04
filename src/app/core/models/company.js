class Company {
  constructor(id, name){
    this.id = id
    this.name = name 
  }

  static rawDataToCompany(rawData){
    return new Company(rawData['id'], rawData['name'])
  }

  static rawDataToCompanies(rawData){
    return rawData.map( raw => Company.rawDataToCompany(raw))
  }
}

export default Company;