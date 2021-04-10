var i = 0;

function trim(){
    if(typeof(String.prototype.trim) === "undefined")
    {
        String.prototype.trim = function() 
        {
            return String(this).replace(/^\s+|\s+$/g, '');
        };
    }
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

function itemData(ID) {
    let request = new XMLHttpRequest();
    request.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/12wZxH_YKZ71AtlY8lrOkjK2DLOgjs9uy0-UfxEVWXKw/values/B" + ID + ":D" + ID + "?key=AIzaSyCzaVfKdBQ6GhatoH_q2JAoaZGn0d9VAl0");
    request.send();
    request.onload = () => {
         item = JSON.parse(request.response).values[0][0];
         cantidad = getCookie(ID);
         price = JSON.parse(request.response).values[0][1];
         
         var div = document.createElement("div");
         div.setAttribute("id","div2")
         var divb = document.createElement("div");
         divb.setAttribute("id","div3")

         var para = document.createElement("p");
         var node = document.createTextNode(" - " + item + " x " + cantidad);
         var span = document.createElement("p");
         span.setAttribute("class", "price");
         var pnode = document.createTextNode(price + " x " + cantidad);

         span.appendChild(pnode)
         para.appendChild(node);
         div.appendChild(para);
         divb.appendChild(span)

         var element = document.getElementById("div1");
         element.appendChild(div);
         element.appendChild(divb);

         aux = document.getElementById("total").innerHTML;
         aux = aux + price + "x" + cantidad
         aux = aux.replace("$","")
         document.getElementById("total").innerHTML = aux;
         aux = aux.split(" ");
         i = 1;
         var total = 0;
         while (i < aux.length){
             precio = aux[i].split("x")[0]
             cantidad = Number(aux[i].split("x")[1])
             precio = Number(precio.replace(".",""))
             total += precio*cantidad
             i++
         }

         largo = String(total).length;
         puntos = Math.floor(largo / 3);
         var partes = String(total).split("")
         i=largo -3;
         largo = partes.length
         while (i > 0){
             partes.splice(i ,0,".")
             i -= 3
         }
         texto = "$ "
         i = 0;
         while (i<partes.length){
             texto += partes[i];
             i++;
         }
         document.getElementById("final").innerHTML = texto;
    }
}

while (i<100){
    cookie = getCookie(i)
    if (cookie != 0){
        item = itemData(i);
    }
    i++;
}

i = 0;