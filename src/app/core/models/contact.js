class Contact {
  constructor(id, name, company, email, mobileNo, message){
    this.id = id 
    this.name = name 
    this.company = company
    this.email = email
    this.mobileNo = mobileNo
    this.message = message
  }

  static rawDataToContact(rawData){
    return new Contact(rawData['id'], rawData['name'], rawData['company'], rawData['email'], rawData['mobile'], rawData['message'])
  }

  static rawDataToContacts(rawData){
    return rawData.map(raw => Contact.rawDataToContact(raw))
  }
}

export default Contact;