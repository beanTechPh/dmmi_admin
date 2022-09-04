class ProductType {
  constructor(id, name){
    this.id = id 
    this.name = name 
  }

  static rawDataToProductType(rawData){
    return new ProductType(rawData['id'], rawData['name'])
  }

  static rawDataToProductTypes(rawData){
    return rawData.map( raw => ProductType.rawDataToProductType(raw))
  }
}

export default ProductType;