class FlashManager {
  static setFlashSuccess(content){
    document.cookie = ("flash-success=" + content + ";Path=/;")
  }

  static setFlashError(content){
    document.cookie = ("flash-error=" + content + ";Path=/;")
  }

  static getFlash(){
    var flashNames = ['flash-success', 'flash-error']
    var flashes = {}
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    ca = ca.filter(data => data.split('=')[1] != '')

    flashNames.forEach(flash => {
      let name = flash + "=";

      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          flashes[flash] = c.substring(name.length, c.length)
          return
        }
      }

      flashes[flash] = ''
      return
    });

    return flashes;
  }

  static setInstantFlashSuccess(content){
    var flash = document.querySelector("#flash-success");

    flash.querySelector(".content").innerHTML = content 
    flash.classList.remove("close")
    flash.classList.remove("to-back")
  }

  static setInstantFlashError(content){
    var flash = document.querySelector("#flash-error");

    flash.querySelector(".content").innerHTML = content 
    flash.classList.remove("close")
    flash.classList.remove("to-back")
  }

  static removeFlash(){
    var flashNames = ['flash-success', 'flash-error']
    
    // reset cookies
    flashNames.forEach(flash => {
      document.cookie = flash + "=;Path=/;expires = Thu, 01 Jan 1970 00:00:00 GMT"
    });
  }

  static setUrls(){
    var prevUrl = FlashManager.getUrls()['current-url']
    document.cookie = ("prev-url=" + prevUrl + ";Path=/;")
    document.cookie = ("current-url=" + window.location.pathname + ";Path=/;")
  }

  static getUrls(){
    var urlNames = ['current-url', 'prev-url']
    var urls = {}
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    ca = ca.filter(data => data.split('=')[1] != '')

    urlNames.forEach(url => {
      let name = url + "=";

      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          urls[url] = c.substring(name.length, c.length)
          return
        }
      }

      urls[url] = ''
      return
    });

    return urls;
  }

  static removeUrls(){
    var urlNames = ['current-url', 'prev-url']
    
    // reset cookies
    urlNames.forEach(url => {
      document.cookie = url + "=;Path=/;expires = Thu, 01 Jan 1970 00:00:00 GMT"
    });
  }
}

export default FlashManager;