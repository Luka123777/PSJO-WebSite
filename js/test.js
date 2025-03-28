require('dotenv').config();
//Crear eventos
document.addEventListener('DOMContentLoaded', function(){
    var ButtonCrear = document.getElementById('crearDiv');

    ButtonCrear.addEventListener('click', function(){
        let nuevoDiv = document.createElement('div');
        nuevoDiv.textContent = 'Hola Mundo';
        nuevoDiv.classList.add('prueba')

        document.getElementById('contenedor').appendChild(nuevoDiv);
        console.log("ejecutando");
    });
});