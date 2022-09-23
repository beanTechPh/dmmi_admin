import { ApiUrl } from "../network/url"

class EquipComponent {
  constructor(id, name, brand, qty, description, image){
    this.id = id 
    this.name = name 
    this.brand = brand 
    this.qty = qty 
    this.description = description
    this.image = null

    if(image !== null && image !== undefined){
      this.image = ApiUrl + image
    }
  }

  static rawDataToEquipComponent(rawData){
    return new EquipComponent(rawData['id'], rawData['name'], rawData['brand'], rawData['qty'], rawData['description'], rawData['image'])
  }

  static rawDataToEquipComponents(rawData){
    return rawData.map(raw => EquipComponent.rawDataToEquipComponent(raw))
  }
}

export default EquipComponent;