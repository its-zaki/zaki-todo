import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector("#form")
const email = document.querySelector("#email")
const password = document.querySelector("#pass")
const name = document.querySelector("#name")


form.addEventListener("submit", (event)=>{
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value, name.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    name.value = ''
    email.value = ''
    password.value = ''
    window.location ="index.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage,
    });
    
  });
})