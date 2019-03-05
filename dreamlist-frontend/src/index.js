const btnSignIn = document.querySelector(".btn-sign-in")
const btnSignUp = document.querySelector(".btn-sign-up")
const signInForm = document.querySelector("#login-form")
const indexDescription = document.querySelector(".index-description")

function toggleSignInForm() {
    const signInFormDiv = document.querySelector(".sign-in-form");
    if (signInFormDiv.style.display === "none") {
      signInFormDiv.style.display = "block";
      btnSignIn.style.display = "none"
      indexDescription.style.display = "none"
    } else {
      signInFormDiv.style.display = "none";
    }
}

function toggleSignUpForm() {
    // const signInForm = document.querySelector(".sign-in-form");
    // if (signInForm.style.display === "none") {
    //   signInForm.style.display = "block";
    //   btnSignIn.style.display = "none"
    //   indexDescription.style.display = "none"
    // } else {
    //   signInForm.style.display = "none";
    // }
    console.log("Not made yet")
}

function dummySubmit() {
    event.preventDefault()
    document.location.href = "dreamlist.html"
}

btnSignIn.addEventListener("click", toggleSignInForm)
btnSignUp.addEventListener("click", toggleSignUpForm)
signInForm.addEventListener("submit", dummySubmit)