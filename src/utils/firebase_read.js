import { 
  getDatabase, 
  ref, 
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const userName = document.getElementById("name");
const firstStar = document.getElementById("1Star");
const secondStar = document.getElementById("2Stars");
const thirdStar = document.getElementById("3Stars");
const fourthStar = document.getElementById("4Stars");
const fifthStar = document.getElementById("5Stars");
const userComment = document.getElementById("message");
const projectSelect = document.getElementById("projectSelector");
const db = getDatabase();

let projectNum = 0;

projectSelect.addEventListener("change", () => {
  console.log("Project Changed")
  projectNum = projectSelect.value;
  const posts = ref(db, `reviews/project${projectNum}/${userName.innerHTML}`);
  get(posts).then((snapshot) => {
    console.log("Post Fetched")
    const data = snapshot.val();
    if(data != null) {
      console.log("Review Exists")
      userName.innerHTML = data.name;
      userComment.value = data.comment;
      switch (data.rating) {
        case 1:
          firstStar.classList = ("fa fa-star");
          secondStar.classList = ("fa fa-star-o");
          thirdStar.classList = ("fa fa-star-o");
          fourthStar.classList = ("fa fa-star-o");
          fifthStar.classList = ("fa fa-star-o");
          break;
        case 2:
          firstStar.classList = ("fa fa-star");
          secondStar.classList = ("fa fa-star");
          thirdStar.classList = ("fa fa-star-o");
          fourthStar.classList = ("fa fa-star-o");
          fifthStar.classList = ("fa fa-star-o");
          break;
        case 3:
          firstStar.classList = ("fa fa-star");
          secondStar.classList = ("fa fa-star");
          thirdStar.classList = ("fa fa-star");
          fourthStar.classList = ("fa fa-star-o");
          fifthStar.classList = ("fa fa-star-o");
          break;
        case 4:
          firstStar.classList = ("fa fa-star");
          secondStar.classList = ("fa fa-star");
          thirdStar.classList = ("fa fa-star");
          fourthStar.classList = ("fa fa-star");
          fifthStar.classList = ("fa fa-star-o");
          break;
        case 5:
          firstStar.classList = ("fa fa-star");
          secondStar.classList = ("fa fa-star");
          thirdStar.classList = ("fa fa-star");
          fourthStar.classList = ("fa fa-star");
          fifthStar.classList = ("fa fa-star");
          break;
        default:
          break;
      };
      console.log("Review Loaded")
    } else {
     console.log("No Review Found")
      userComment.value = '';
      firstStar.classList = ("fa fa-star-o");
      secondStar.classList = ("fa fa-star-o");
      thirdStar.classList = ("fa fa-star-o");
      fourthStar.classList = ("fa fa-star-o");
      fifthStar.classList = ("fa fa-star-o");
    };
  });
});
