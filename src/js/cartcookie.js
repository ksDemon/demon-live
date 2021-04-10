ID = document.getElementById("id").innerHTML;
ID = String(Number(ID) + 1);

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return 0;
  }

function add() {
    var cantidad = getCookie(ID);
    if (cantidad == 0) {
        document.cookie = ID + "=1; path=/;"
    }
    else {
        var aumento = String(Number(cantidad)+1);
        document.cookie = ID + "="  + aumento + "; path=/;";
    }
}

function sub() {
    var cantidad = getCookie(ID);
    if (cantidad =! 0) {
        var aumento = String(Number(cantidad)-1);
        document.cookie = ID + "="  + aumento + "; path=/;";
    }
}