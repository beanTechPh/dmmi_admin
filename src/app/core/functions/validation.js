export const textValidation = (textInputs) => {
  var isValid = true

  for (let i = 0; i < textInputs.length; i++) {
    const id = textInputs[i];
    
    if(document.querySelector(id).value === ""){
      document.querySelector(id).classList.add('empty')
      isValid = false
      break
    }else if(document.querySelector(id).name === "email") {
      const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    
      if(validateEmail(document.querySelector(id).value) === null){
        document.querySelector(id).classList.add('empty')
        isValid = false
        break
      }else{
        document.querySelector(id).classList.remove('empty')
      }
    }else{
      document.querySelector(id).classList.remove('empty')
    }
  }

  return isValid
}