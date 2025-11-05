import { 
  getDatabase, 
  set, 
  ref, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import { app } from './firebase_init.js';

const project = document.getElementById("projectSelector");
const userName = document.getElementById("name");
const ratingBox = document.getElementById("rating");
const firstStar = document.getElementById("1Star");
const secondStar = document.getElementById("2Stars");
const thirdStar = document.getElementById("3Stars");
const fourthStar = document.getElementById("4Stars");
const fifthStar = document.getElementById("5Stars");
const userComment = document.getElementById("message");
const sendReview = document.getElementById("submitForm");
const db = getDatabase(app);

let rating = 0;

// Star rating system
firstStar.addEventListener("click", () => {
  rating = 1;
  firstStar.classList = "fa fa-star";
  secondStar.classList = "fa fa-star-o";
  thirdStar.classList = "fa fa-star-o";
  fourthStar.classList = "fa fa-star-o";
  fifthStar.classList = "fa fa-star-o";

  console.log("Rating set to 1")
});

secondStar.addEventListener("click", () => {
  rating = 2;
  firstStar.classList = "fa fa-star";
  secondStar.classList = "fa fa-star";
  thirdStar.classList = "fa fa-star-o";
  fourthStar.classList = "fa fa-star-o";
  fifthStar.classList = "fa fa-star-o";

  console.log("Rating set to 2")
});

thirdStar.addEventListener("click", () => {
  rating = 3;
  firstStar.classList = "fa fa-star";
  secondStar.classList = "fa fa-star";
  thirdStar.classList = "fa fa-star";
  fourthStar.classList = "fa fa-star-o";
  fifthStar.classList = "fa fa-star-o";

  console.log("Rating set to 3")
});

fourthStar.addEventListener("click", () => {
  rating = 4;
  firstStar.classList = "fa fa-star";
  secondStar.classList = "fa fa-star";
  thirdStar.classList = "fa fa-star";
  fourthStar.classList = "fa fa-star";
  fifthStar.classList = "fa fa-star-o";

  console.log("Rating set to 4")
});

fifthStar.addEventListener("click", () => {
  rating = 5;
  firstStar.classList = "fa fa-star";
  secondStar.classList = "fa fa-star";
  thirdStar.classList = "fa fa-star";
  fourthStar.classList = "fa fa-star";
  fifthStar.classList = "fa fa-star";

  console.log("Rating set to 5")
});

// Send the review to the server
sendReview.addEventListener("click", () => {
  console.log("Sending Review")

  if(firstStar.classList == "fa fa-star-o") {
    console.log("Send Failed")
    userComment.classList.remove("warning");
    userName.classList.remove("warning");
    project.classList.remove("warning");
    ratingBox.classList.add("warning");
  } else if (userName.innerHTML.trim() == ""){
    console.log("Send Failed")
    userComment.classList.remove("warning");
    ratingBox.classList.remove("warning");
    project.classList.remove("warning");
    userName.classList.add("warning");
  } else if(userComment.value.trim() == "") {
    console.log("Send Failed")
    ratingBox.classList.remove("warning");
    userName.classList.remove("warning");
    project.classList.remove("warning");
    userComment.classList.add("warning");
  } else if (project.value == 0){
    console.log("Send Failed")
    ratingBox.classList.remove("warning");
    userName.classList.remove("warning");
    userComment.classList.remove("warning");
    project.classList.add("warning");
  } else {
    userComment.classList.remove("warning");
    userName.classList.remove("warning");
    ratingBox.classList.remove("warning");
    project.classList.remove("warning");
    let projectnum = project.value;

    if (secondStar.classList == "fa fa-star-o") {
      rating = 1
    } else if (thirdStar.classList == "fa fa-star-o") {
      rating = 2
    } else if (fourthStar.classList == "fa fa-star-o") {
      rating = 3
    } else if (fifthStar.classList == "fa fa-star-o") {
      rating = 4
    } else {
      rating = 5
    }

    set(ref(db, `reviews/project${projectnum}/${userName.innerHTML}`),{
      name: userName.innerHTML,
      comment: userComment.value,
      rating: rating,
      time: serverTimestamp()
    });

    console.log("Send Completed")
  
  // Reset Rating
    firstStar.classList = "fa fa-star-o";
    secondStar.classList = "fa fa-star-o";
    thirdStar.classList = "fa fa-star-o";
    fourthStar.classList = "fa fa-star-o";
    fifthStar.classList = "fa fa-star-o";
    rating = 0;
  
  // Reset name and comment box
    userComment.value = '';
    project.value = 0;

    console.log("Input Fields Reset")
  };
});
