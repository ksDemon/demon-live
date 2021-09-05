var data = [];
ul = document.getElementById("myUL");

let request = new XMLHttpRequest();
request.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/15BknAhKyqL_SrfexLJarCIgs9lL8yWMetuMTtcm-i6w/values/A1:E30?key=AIzaSyCzaVfKdBQ6GhatoH_q2JAoaZGn0d9VAl0");
request.send();
request.onload = () => {
    data = JSON.parse(request.response).values;
    addData(data);
}

function addData(lista){
    for (var i = 0; i < lista.length; i++) {
        nombre = lista[i][0]
        li = document.createElement("li")
        li.setAttribute("id", i);
        a = document.createElement("a")
        text = document.createTextNode(nombre)
        a.appendChild(text)
        li.appendChild(a)
        ul.appendChild(li)

    }

    var items = document.querySelectorAll('li');
    items.forEach(item => {
    item.addEventListener('click', () => {
        items.forEach(item => item.classList.remove('active'))
        item.classList.add('active')
        ID = item.id
        console.log(ID)

        document.getElementById("nombre").innerHTML = data[ID][0]
        document.getElementById("desc").innerHTML = data[ID][1]
        document.getElementById("link").setAttribute("href",data[ID][2])
        document.getElementById("link").innerHTML = data[ID][3]
        document.getElementById("imagemain").src = "./assets/mods/" + data[ID][4];

        }) 
    })
    items[0].classList.add('active')
    
}