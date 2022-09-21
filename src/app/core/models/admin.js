class Admin {
  constructor(id, name, email, mobileNo, address){
    this.id = id
    this.name = name 
    this.email = email 
    this.mobileNo = mobileNo
    this.address = address
  }

  static rawDataToAdmin(rawData){
    return new Admin(rawData['id'], rawData['name'], rawData['email'], rawData['mobile_no'], rawData['address'])
  }

  static rawDataToAdmins(rawData){
    return rawData.map(raw => Admin.rawDataToAdmin(raw))
  }
}

export default Admin;