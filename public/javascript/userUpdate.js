
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
    //let inputAvatar = qs('#avatar');
    let inputPass = qs('#pass');
    let inputCpass = qs('#cpass');
    

    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    inputFname.addEventListener('blur',function(){
        switch (true) {

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

    // inputAvatar.addEventListener('change',function(e){

    //     let reader = new FileReader();

    //     reader.readAsDataURL(e.target.files[0]);

    //     reader.onload = function(){
    //             vistaPrevia.src = reader.result;
    //             inputAvatar.classList.remove('is-invalid')
    //             inputAvatar.classList.add('is-valid');
    //             errorAvatar.innerHTML = ""
    //     }      
    // })
        
    inputPass.addEventListener('blur',function(){
        switch (true) {

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

    // checkBases.addEventListener('click',function(){
    //         checkBases.classList.toggle('is-valid');
    //         checkBases.classList.remove('is-invalid');
    //         errorBases.innerHTML = ""
    // })

    formRegister.addEventListener('submit',function(event){
        event.preventDefault();
        // if(checkBases.checked == false){
        //     checkBases.classList.add('is-invalid');
        //     errorBases.innerHTML = "Debes aceptar las bases y condiciones"
        // }
        let error = false
        for (let index = 0; index < elementos.length-1; index++) {
            if(elementos[index].value == 0){
                elementos[index].classList.add('is-invalid');
               error = true;
            }
        }
        if(!error){
            formRegister.submit()
        }else{
            msgError.innerHTML = "Los campos señadados son obligatorios"
        }
    })

  })