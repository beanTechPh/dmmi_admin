class Branch {
  constructor(id, name, companyId){
    this.id = id 
    this.name = name 
    this.companyId = companyId
  }

  static rawDataToBranch(rawData){
    return new Branch(rawData['id'], rawData['name'], rawData['company_id'])
  }

  static rawDataToBranches(rawData){
    return rawData.map( raw => Branch.rawDataToBranch(raw))
  }
}

export default Branch;