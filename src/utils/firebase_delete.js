import { 
  getDatabase, 
  ref, 
  remove, 
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const deleteConfirmWindow = document.getElementById("deleteConfirmation");
const deleteSuccessWindow = document.getElementById("deleteSuccessMessage");
const confirmDeleteButton = document.getElementById("confirm");
const cancelButton = document.getElementById("cancel");
const closeWindowButton = document.getElementById("continue");
const deleteButton = document.getElementById("deleteReview");
const project = document.getElementById("projectSelector");
const user = document.getElementById("name");
const rating1 = document.getElementById("1Star");
const rating2 = document.getElementById("2Stars");
const rating3 = document.getElementById("3Stars");
const rating4 = document.getElementById("4Stars");
const rating5 = document.getElementById("5Stars");
const comment = document.getElementById("message");
const db = getDatabase();

deleteButton.addEventListener("click", () => {
  deleteConfirmWindow.classList.remove("hidden");
  console.log("Confirmation Window Opened")
});

confirmDeleteButton.addEventListener("click", () => {
  console.log("Deletion Confirmed")
  const path = ref(db, `/reviews/project${project.value}/${user.innerHTML}`);
  onValue(path, (snapshot) => {
    if(snapshot.exists()) {
      remove(path);
      
      deleteConfirmWindow.classList.add("hidden");
      deleteSuccessWindow.classList.remove("hidden");
      
      comment.value = '';
      project.value = 0;
      
      rating1.classList = "fa fa-star-o";
      rating2.classList = "fa fa-star-o";
      rating3.classList = "fa fa-star-o";
      rating4.classList = "fa fa-star-o";
      rating5.classList = "fa fa-star-o";
      console.log("Review Removed")
    };
  });
});

cancelButton.addEventListener("click", () => {
  deleteConfirmWindow.classList.add("hidden");
  console.log("Delete Canceled")
});

closeWindowButton.addEventListener("click", () => {
  deleteSuccessWindow.classList.add("hidden");
  console.log("Delete Popup Closed")
});
