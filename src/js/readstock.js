ID = document.getElementById("id").innerHTML;
ID = Number(ID) + 1;

let request = new XMLHttpRequest();
request.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/12wZxH_YKZ71AtlY8lrOkjK2DLOgjs9uy0-UfxEVWXKw/values/D" + ID + ":D" + ID + "?key=AIzaSyCzaVfKdBQ6GhatoH_q2JAoaZGn0d9VAl0");
request.send();
request.onload = () => {
    document.getElementById("stock").innerHTML = "Disponibilidad: " + JSON.parse(request.response).values[0][0] + " unidades";
}