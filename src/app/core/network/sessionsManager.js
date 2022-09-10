class SessionsManager {
  static setHeaders (response) {
    var headers = ['access-token', 'uid', 'client']
    
    // reset cookies
    SessionsManager.destroyHeaders()

    for(const header in response.headers) {
      if (headers.includes(header)) {
        document.cookie = (header + "=" + response.headers[header] + ";")
      }
    }
  }

  static getHeaders () {
    var headerNames = ['access-token', 'uid', 'client']
    var headers = {}
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    ca = ca.filter(data => data.split('=')[1] != '')

    headerNames.forEach(header => {
      let name = header + "=";

      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          headers[header] = c.substring(name.length, c.length)
          return
        }
      }

      headers[header] = ''
      return
    });

    return headers;
  }

  static destroyHeaders () {
    var headers = ['access-token', 'uid', 'client']
    
    // reset cookies
    headers.forEach(header => {
      document.cookie = header + "=;"
    });
  }
}

export default SessionsManager;