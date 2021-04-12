cookie=getCookie("orden")

if (cookie == 0){
    let request = new XMLHttpRequest();
    request.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/12wZxH_YKZ71AtlY8lrOkjK2DLOgjs9uy0-UfxEVWXKw/values/Hoja%202!I1:I1?key=AIzaSyCzaVfKdBQ6GhatoH_q2JAoaZGn0d9VAl0");
    request.send();
    request.onload = () => {
  orden = JSON.parse(request.response).values[0][0];
  document.cookie = "orden=" + orden + "; path=/;";
}
}