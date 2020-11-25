
const qs = function (element){
    return document.querySelector(element);
}


window.addEventListener('load',function(){
    console.log('JS vinculado correctamente...');

    let formRegister = qs('form#profile');

    let elementos = formRegister.elements;

    let inputFname = qs('#fname');
    let inputLname = qs('#lname');
    let inputEmail = qs('#email');
    let inputAvatar = qs('#avatar');
    let inputPass = qs('#pass');
    let inputCpass = qs('#cpass');
    let checkBases = qs('.custom-control-input');

    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    inputFname.addEventListener('blur',function(){
        switch (true) {
            case this.value == 0:
                errorFname.innerHTML = "El campo nombre es obligatorio"
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length <=2:
                errorFname.innerHTML = "Tenés que poner al menos tres letras"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorFname.innerHTML = ""
                break;
        }
    })

    inputLname.addEventListener('blur',function(){
        switch (true) {
            case this.value == 0:
                errorLname.innerHTML = "El campo apellido es obligatorio"
                this.classList.add('is-invalid')
                break;
            case thi    s.value.trim().length <=2:
                errorLname.innerHTML = "Tenés que poner al menos tres letras"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorLname.innerHTML = ""
                break;
        }
    })

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


    inputCpass.addEventListener('blur',function(){
        switch (true) {
            case this.value == 0:
                errorCpass.innerHTML = "Reingrese su contraseña"
                this.classList.add('is-invalid')
                break;
            case this.value != inputPass.value:
                errorCpass.innerHTML = "Las contraseñas no coinciden"
                this.classList.add('is-invalid')
                break;
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorCpass.innerHTML = ""
                break;
        }
    })

  

  })