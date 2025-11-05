import { 
  sendEmailVerification, 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const resend = document.getElementById("resendButton");
const page = document.getElementById("mainPage");
const loginPage = document.getElementById("signInPage");
const loadingPage = document.getElementById("loadingPage");
const verificationAwaitPage = document.getElementById("verificationPage");
const signup = document.getElementById("signUpButton");
const login = document.getElementById("signInButton");
const logOut = document.getElementById("signOut");
const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
const userNameDisplay = document.getElementById("name");
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const signUpName = document.getElementById("signUpName");
const auth = getAuth();

loadingPage.classList.remove("hidden");
loginPage.classList.add("hidden");
page.classList.add("hidden");
verificationAwaitPage.classList.add("hidden");

onAuthStateChanged(auth, (user) => {
  console.log("Checking Authentication")
  if (user && user.emailVerified) {
    console.log("Logged In / Verified")
    loadingPage.classList.add("hidden");
    loginPage.classList.add("hidden");
    page.classList.remove("hidden");
    verificationAwaitPage.classList.add("hidden");
    userNameDisplay.innerHTML = user.displayName;
    console.log("Main Page Loaded")
  } else if(user) {
    console.log("Logged In Not Verified")
    loadingPage.classList.add("hidden");
    loginPage.classList.add("hidden");
    page.classList.add("hidden");
    verificationAwaitPage.classList.remove("hidden");
    console.log("Verification Message Loaded")
  } else {
    console.log("Not Logged In")
    loadingPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
    verificationAwaitPage.classList.add("hidden");
    page.classList.add("hidden");
    console.log("Login Page Loaded")
  };
});

signup.addEventListener("click", () => {
  console.log("Signing Up")
  createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: signUpName.value
    });
    signUpEmail.value = '';
    signUpName.value = '';
    signUpPassword.value = '';
    sendEmailVerification(auth.currentUser)
    .then(
      console.log('Confirmation Email Sent')
    )
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
    });
    userNameDisplay.innerHTML = user.displayName;
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorMessage)
  });
});

login.addEventListener("click", () => {
  console.log("Logging In")
  signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    signInEmail.value = '';
    signInPassword.value = '';
    userNameDisplay.innerHTML = user.displayName;
    console.log("Logged In")
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorMessage)
  });
});

logOut.addEventListener("click", () => {
  signOut(auth);
  console.log("Signed Out")
});

resend.addEventListener("click", () => {
  sendEmailVerification(auth.currentUser);
  console.log("Verification Email Resent")
});