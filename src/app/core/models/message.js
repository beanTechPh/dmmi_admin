class Message {
  constructor(id, userType, userId, body, date){
    this.id = id 
    this.userType = userType
    this.userId = userId
    this.body = body
    this.date = date
  }

  static rawDataToMessage(rawData){
    return new Message(rawData['id'], rawData['user_type'], rawData['user_id'], rawData['body'], rawData['date'])
  }

  static rawDataToMessages(rawData){
    return rawData.map(raw => Message.rawDataToMessage(raw))
  }
}

export default Message;