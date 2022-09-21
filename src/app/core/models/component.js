class EquipComponent {
  constructor(id, name, brand, qty, description, image){
    this.id = id 
    this.name = name 
    this.brand = brand 
    this.qty = qty 
    this.description = description
    this.image = image
  }

  static rawDataToEquipComponent(rawData){
    return new EquipComponent(rawData['id'], rawData['name'], rawData['qty'], rawData['description'], rawData['image'])
  }
}

export default EquipComponent;