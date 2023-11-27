import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// getting html tags

const form = document.querySelector("form");
const title = document.querySelector("#title");
const card = document.querySelector("#card");

//user login or logout function

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = "index.html";
  }
});

//user logout function

const logout = document.querySelector("#logout-btn");
logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Successfully Logout");
      window.location = "index.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

//getting user data from firestore function
let arr = [];
function render() {
  arr.map((item) => {
    card.innerHTML += `
    <div class="card mt-3">
    <div class="card-body ">
        <div class="buttons-div">
        <div>
        <p><span class="h4">${item.title}</span></p>
        </div>
            <div>
                <button class="del" ><i class="ri-delete-bin-line"></i></button><button class="edit"><i class="ri-pencil-fill"></i></button>
            </div>
        </div>
    </div>
  </div>`;
  });
  const deleted = document.querySelectorAll(".del");
  const edited = document.querySelectorAll(".edit");
  deleted.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("delete call", index);
      await deleteDoc(doc(db, "posts", arr[index].docId)).then(() => {
        console.log("post deleted");
        arr.splice(index, 1);
        render();
      });
    });
  });
  edited.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      console.log("edit call", index);
      const updatedTitle = prompt("enter new Title");
      await updateDoc(doc(db, "posts", arr[index].docId), {
        title: updatedTitle,
      });
      arr[index].title = updatedTitle;
      render();
    });
  });
}

async function getDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), docId: doc.id });
    // console.log(doc.id);
  });
  console.log(arr);
  render();
  // arr.map((item) => {
  //   card.innerHTML += `
  //   <div class="card mt-3">
  //   <div class="card-body ">
  //       <div class="buttons-div">
  //       <div>
  //       <p><span class="h4">${item.title}</span></p>
  //       </div>
  //           <div>
  //               <button class="del" ><i class="ri-delete-bin-line"></i></button><button class="edit"><i class="ri-pencil-fill"></i></button>
  //           </div>
  //       </div>
  //   </div>
  // </div>`;
  //   // console.log(item);
  // });
  // const deleted = document.querySelectorAll(".del")
  // const edited = document.querySelectorAll(".edit")
  // deleted.forEach((btn, index)=>{
  //   btn.addEventListener('click',async (
  //   )=>{
  //     console.log("delete call", index);
  //     await deleteDoc(doc(db, "posts", arr[index].docId))
  //     .then(() => {
  //       console.log('post deleted');
  //       arr.splice(index, 1);
  //       render()
  //   });

  //   })
  // })
  // edited.forEach((btn, index)=>{
  //   btn.addEventListener('click', async()=>{
  //     console.log("edit call" , index);
  //     const updatedTitle = prompt('enter new Title');
  //           await updateDoc(doc(db, "posts", arr[index].docId), {
  //               title: updatedTitle
  //           });
  //           arr[index].title = updatedTitle;
  //           render()
  //   })
  // })
}
getDataFromFirestore()
// render()
//add data in firestore function

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(title.value);
  card.innerHTML = "";
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      title: title.value,
      uid: auth.currentUser.uid,
      postDate: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    render()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  title.value = "";
});
