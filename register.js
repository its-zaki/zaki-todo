import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth ,db} from "./config.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#pass");
const name = document.querySelector("#name");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      const names = name.value;
      addDoc(collection(db, "users"), {
        names: names,
        email: email.value,
      })
        .then((res) => {
          console.log(res);
          window.location = "home.html";
        })
        .catch((err) => {
          console.log(err);
        });
      name.value = "";
      email.value = "";
      password.value = "";
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
});
