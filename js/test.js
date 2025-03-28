// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0cdxFFjxFlwVOK_DMA6eXkEQlS5ByCJk",
  authDomain: "psjo-6715f.firebaseapp.com",
  projectId: "psjo-6715f",
  storageBucket: "psjo-6715f.firebasestorage.app",
  messagingSenderId: "862904012079",
  appId: "1:862904012079:web:d230ff9d18bf35203b25da",
  measurementId: "G-TJQ56MFY94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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