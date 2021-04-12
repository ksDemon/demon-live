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

let params = new URLSearchParams(location.search);
uname = params.get("name")
email = params.get("email")
phone = params.get("phone")
country = params.get("country")
region = params.get("region")
city = params.get("city")
direction = params.get("direction")
cookie=getCookie("orden")
items=getCookie("items")
price=getCookie("t")

console.log(cookie)
console.log(uname,email,phone)
console.log(country,region,city,direction)
console.log(items.split(","), price)


let request = new XMLHttpRequest();
request.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/12wZxH_YKZ71AtlY8lrOkjK2DLOgjs9uy0-UfxEVWXKw/values/Hoja%202!I1:I1?key=AIzaSyCzaVfKdBQ6GhatoH_q2JAoaZGn0d9VAl0");
request.send();
request.onload = () => {
  orden = JSON.parse(request.response).values[0][0];
  if (cookie == orden){
      console.log("ORDEN VALIDA")

      
      //restar stock
      //escribir datos orden
      //escribir numero de oreden +1 I1
      //enviar solicitud de pago
      //document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      
      


      request.open("POST", "https://sheets.googleapis.com/v4/spreadsheets/12wZxH_YKZ71AtlY8lrOkjK2DLOgjs9uy0-UfxEVWXKw/values/Hoja%202!I1:I1:clear?key=AIzaSyCzaVfKdBQ6GhatoH_q2JAoaZGn0d9VAl0");
      request.send();




  }
  else {
      console.log("ORDEN INVALIDA")
  }
}