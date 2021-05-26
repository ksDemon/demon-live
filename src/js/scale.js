div = document.getElementById("gamediv")
iframe = document.getElementById("pongFrame")

window.addEventListener('resize', () => scaleElements());
document.onload = scaleElements()

function scaleElements() {
    scaleH = 0.3 * window.innerHeight / 939
    scaleW = 0.3 * window.innerWidth / 1920
    if (scaleW < scaleH) {
        scale = scaleW
    } else {
        scale = scaleH
    }
    per = scale ** (-1) * 100 + "%"
    pix = scale * 4 * 750 + "px"
    div.style.height = pix
    div.style.width = pix
    iframe.style.height = per
    iframe.style.width = per
    iframe.style.zoom = scale
    iframe.style.webkitTransform = "scale(" + scale + ")"
}