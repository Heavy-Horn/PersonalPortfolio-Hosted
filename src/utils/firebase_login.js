import { 
  sendEmailVerification, 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { 
  getDatabase, 
  set, 
  ref,
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import { app } from './firebase_init.js';

const logOutVerification = document.getElementById("logoutButton");
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
const errorMessageDisplay = document.getElementById("errorcode");
const auth = getAuth();
const db = getDatabase(app);

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
  if (signUpName.value.trimmed != undefined) {
    const displaynames = ref(db, `users/${signUpName.value}`);
    get(displaynames).then((snapshot) => {
      if (snapshot.exists()) {
        errorMessageDisplay.classList.remove('hidden');
        errorMessageDisplay.innerHTML = "Display Name Taken";
      } else {
        createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: signUpName.value
          });
          set(ref(db, `users/${signUpName.value}`),{
            exists: true
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
          const errorMessage = error.message;
          switch (errorMessage) {
            case 'Firebase: Error (auth/invalid-credential).':
              errorMessageDisplay.classList.remove('hidden');
              errorMessageDisplay.innerHTML = "Invalid Password";
              break
            case 'Firebase: Error (auth/invalid-email).':
              errorMessageDisplay.classList.remove('hidden');
              errorMessageDisplay.innerHTML = "Invalid Email";
              break
            case 'Firebase: Error (auth/email-already-in-use).':
              errorMessageDisplay.classList.remove('hidden');
              errorMessageDisplay.innerHTML = "Email Already Used";
              break
          };
          console.log(errorMessage);
        });
      }
    })
  } else {
    errorMessageDisplay.classList.remove('hidden');
    errorMessageDisplay.innerHTML = "No Display Name";
  }
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
    const errorMessage = error.message;
    switch (errorMessage) {
      case 'Firebase: Error (auth/invalid-credential).':
        errorMessageDisplay.classList.remove('hidden');
        errorMessageDisplay.innerHTML = "Invalid Password";
        break
      case 'Firebase: Error (auth/invalid-email).':
        errorMessageDisplay.classList.remove('hidden');
        errorMessageDisplay.innerHTML = "Invalid Email";
        break
    };
    console.log(errorMessage);
  });
});

logOut.addEventListener("click", () => {
  signOut(auth);
  console.log("Signed Out")
});

logOutVerification.addEventListener("click", () => {
  signOut(auth);
  console.log("Signed Out")
});

resend.addEventListener("click", () => {
  sendEmailVerification(auth.currentUser);
  console.log("Verification Email Resent")
});