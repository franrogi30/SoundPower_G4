
const qs = function (element){
    return document.querySelector(element);
}

window.addEventListener('load',function(){

    let salida = qs('#salida');
salida.onsubmit = ()=>{
    alert("Gracias por visitar nuestra pagina, lo esperamos pronto")
}})
