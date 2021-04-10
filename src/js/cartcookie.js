ID = document.getElementById("id").innerHTML;
ID = String(Number(ID) + 1);

var stock;

let request = new XMLHttpRequest();
request.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/12wZxH_YKZ71AtlY8lrOkjK2DLOgjs9uy0-UfxEVWXKw/values/D" + ID + ":D" + ID + "?key=AIzaSyCzaVfKdBQ6GhatoH_q2JAoaZGn0d9VAl0");
request.send();
request.onload = () => {
    stock = JSON.parse(request.response).values[0][0];
    document.getElementById("stock").innerHTML = "Disponibilidad: " + JSON.parse(request.response).values[0][0] + " unidades";
    document.getElementById("cart").innerHTML = String(getCookie(ID));
}

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
  let request = new XMLHttpRequest();
  request.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/12wZxH_YKZ71AtlY8lrOkjK2DLOgjs9uy0-UfxEVWXKw/values/D" + ID + ":D" + ID + "?key=AIzaSyCzaVfKdBQ6GhatoH_q2JAoaZGn0d9VAl0");
  request.send();
  request.onload = () => {
    stock = JSON.parse(request.response).values[0][0];
    document.getElementById("stock").innerHTML = "Disponibilidad: " + JSON.parse(request.response).values[0][0] + " unidades";
    var cantidad = getCookie(ID);
    if (cantidad == 0 && stock != 0) {
        document.cookie = ID + "=1; path=/;"
    }
    else {
      var aumento = Number(cantidad)+1;
      if (aumento <= stock) {
        document.cookie = ID + "="  + aumento + "; path=/;";
      }
    }
    document.getElementById("cart").innerHTML = String(getCookie(ID));
  }
}

function sub() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/12wZxH_YKZ71AtlY8lrOkjK2DLOgjs9uy0-UfxEVWXKw/values/D" + ID + ":D" + ID + "?key=AIzaSyCzaVfKdBQ6GhatoH_q2JAoaZGn0d9VAl0");
  request.send();
  request.onload = () => {
      stock = JSON.parse(request.response).values[0][0];
      document.getElementById("stock").innerHTML = "Disponibilidad: " + JSON.parse(request.response).values[0][0] + " unidades";
      var cantidad = Number(getCookie(ID));
      if (cantidad > 0) {
          var aumento = Number(cantidad)-1;
          document.cookie = ID + "="  + aumento + "; path=/;";
      }
      document.getElementById("cart").innerHTML = String(getCookie(ID));
  }
}