function onClick(path) {
    console.log("da");
    fetch(`http://192.168.1.116:3000/${path}`, {
        method: "GET",
        mode: "no-cors",
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
        }
    })
}
document.getElementById("1").addEventListener("click", () => {
    onClick("on")
})
document.getElementById("2").addEventListener("click", () => {
    onClick("off")
})