import { ApiUrl } from "../network/url"
import Branch from "./branch"
import EquipComponent from "./equipComponent"
import ProductType from "./productType"

class Equipment {
  constructor(id, name, type, serialNo, origin, description, age, branch, brand, images, installedDate, schematics, components, documentation, qrCode){
    this.id = id
    this.name = name 
    this.productType = ProductType.rawDataToProductType(type) 
    this.serialNo = serialNo
    this.origin = origin
    this.description = description
    this.age = age
    this.branch = Branch.rawDataToBranch(branch)
    this.brand = brand
    this.images = []
    this.installedDate = installedDate
    this.schematics = []
    this.components = components === null || components === undefined ? [] : EquipComponent.rawDataToEquipComponents(components)
    this.documentation = documentation === null || documentation === undefined ? null : (ApiUrl + documentation)
    this.qrCode = qrCode === null || qrCode === undefined ? null : (ApiUrl + qrCode)

    if(images !== null && images !== undefined){
      images.forEach(image => {
        this.images.push(ApiUrl + image)
      });
    }

    if(schematics !== null && schematics !== undefined){
      schematics.forEach(schematic => {
        this.schematics.push(ApiUrl + schematic)
      });
    }

  }

  static rawDataToEquipment(rawData){
    return new Equipment(rawData['id'], rawData['name'], rawData['type'], rawData['serial_no'], rawData['origin'], rawData['description'], rawData['age'], rawData['branch'], rawData['brand'], rawData['images'], rawData['installed_date'], rawData['schematics'], rawData['components'], rawData['documentation'], rawData['qr_code'])
  }

  static rawDataToEquipments(rawData){
    return rawData.map( raw => Equipment.rawDataToEquipment(raw))
  }

  static sampleData(){
    var data = [
      {
        'id': 1,
        'name': "Low Voltage Switch Gear",
        'type': "All Types Of Free Standing Panels",
        'serial_no': "22001",
        'origin': "Order",
        'description': "4000A, 3P, 400V, Schnieder",
        'age': "6 years",
        'branch': 'City Mall Cotabato'
      },
      {
        'id': 2,
        'name': "Enclosed Panel Board",
        'type': "Distribution Panel Board",
        'serial_no': "22002",
        'origin': "Scan",
        'description': "4000A, 3P, 400V, Schnieder",
        'age': "6 years",
        'branch': 'City Mall Danao'
      }
    ]

    return Equipment.rawDataToEquipments(data)
  }

}

export default Equipment;