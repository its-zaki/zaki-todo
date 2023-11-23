import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector("#form")
const email = document.querySelector("#email")
const password = document.querySelector("#pass")


form.addEventListener("submit", (event)=>{
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    window.location = "./home.html"
    console.log(user);
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