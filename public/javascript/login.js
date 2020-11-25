
const qs = function (element){
    return document.querySelector(element);
}


window.addEventListener('load',function(){
    console.log('JS vinculado correctamente...');

    let formLogin = qs('form#login');

    let elementos = formLogin.elements;

    let inputEmail = qs('#email');
    let inputPass = qs('#pass')



    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    console.log(inputEmail)


    inputEmail.addEventListener('blur',function(){
    
        switch (true) {
            case this.value == 0:
                errorEmail.innerHTML = "El campo email es obligatorio"
                this.classList.add('is-invalid')
                break;
            case !regExEmail.test(this.value):
                errorEmail.innerHTML = "Debes escribir un email válido"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorEmail.innerHTML = ""
                break;
        }
    })

        
    inputPass.addEventListener('blur',function(){
        switch (true) {
            case this.value == 0:
                errorPass.innerHTML = "El campo contraseña es obligatorio"
                this.classList.add('is-invalid')
                break;
            case !regExPass.test(this.value):
                errorPass.innerHTML = "La contraseña debe tener entre 6 y 12 caracteres, una mayúscula una minúscula y un número"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorPass.innerHTML = ""
                break;
        }
    })

    inputPass.addEventListener('mouseover',function(){
       this.setAttribute("title","La contraseña debe tener entre 6 y 12 caracteres, una mayúscula una minúscula y un número");
    })



    formLogin.addEventListener('submit',function(event){
        event.preventDefault();
console.log(elementos)
        
        let error = false
        for (let index = 0; index < elementos.length-1; index++) {
            if(elementos[index].value == 0){
                elementos[index].classList.add('is-invalid');
               error = true;
            }
        }
        if(!error){
            formLogin.submit()
        }else{
            msgError.innerHTML = "Los campos señadados son obligatorios"
        }
    })

})