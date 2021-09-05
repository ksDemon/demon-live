function postImage() {
    var bp = document.getElementById("bp")
    var apiurl = "http://190.163.179.8:5000/"
    var bp64= getBase64Image(bp)
    console.log(bp64)

    post(bp64, apiurl)

    

}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  
  function post(bp64, apiurl) {
    $.ajax
    ({
        type: "POST",
        url: apiurl,
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify({ "test": bp64 }),
        success: function (data) {
            console.log(data);
            alert("ENVIADO!"); 
        }
    })
}
