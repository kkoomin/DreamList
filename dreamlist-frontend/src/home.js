const homeTitle = document.querySelector("#home-title")
const btnSignIn = document.querySelector(".btn-sign-in")
const btnSignUp = document.querySelector(".btn-sign-up")
const signInForm = document.querySelector("#login-form")
const signUpForm = document.querySelector("#create-form");
const indexDescription = document.querySelector(".index-description")

// dealing with data
function getUserData() {
  return fetch(`http://localhost:3000/users`)
  .then(res => res.json())
}

function createUserData(data) {
  const options = {
    method: "POST",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify(data)
  }
  return fetch("http://localhost:3000/users", options)
  .then(res => res.json())
}


// rendering form
function toggleSignInForm() {
    const signInFormDiv = document.querySelector(".sign-in-form");
    if (signInFormDiv.style.display === "none") {
      signInFormDiv.style.display = "block";
      btnSignIn.style.display = "none"
      btnSignUp.style.display = "none"
      indexDescription.style.display = "none"
    } else {
      signInFormDiv.style.display = "none";
    }
    signInForm.addEventListener("submit", userSignIn)
}

function toggleSignUpForm() {
    const signUpFormDiv = document.querySelector(".sign-up-form");
    if (signUpFormDiv.style.display === "none") {
      signUpFormDiv.style.display = "block";
      initiateSelectionHomeList()
      loadSelect2()
      btnSignIn.style.display = "none"
      btnSignUp.style.display = "none"
      indexDescription.style.display = "none"
    } else {
      signUpFormDiv.style.display = "none";
    }
    signUpForm.addEventListener("submit", userSignUp)
}

function loadSelect2(){
  $(document).ready(function() {
      $('.js-example-basic-single').select2();
  });
}

async function initiateSelectionHomeList (){
  const searchDirectEl = document.querySelector('#searchDirect')
  const list = await getWorldCities()
  list.forEach((city)=>{
    const optionEl = document.createElement('option')
    optionEl.innerText = `${city.name}, ${city.country}`
    optionEl.value =  `${city.id}`
    searchDirectEl.appendChild(optionEl)
  })
}

function getWorldCities(){
  return fetch('http://localhost:3000/destinations/worldcities')
    .then(res => res.json())
}

btnSignIn.addEventListener("click", toggleSignInForm)
btnSignUp.addEventListener("click", toggleSignUpForm)


//user login
function userSignIn(event) {
  event.preventDefault()
  const userNameInput = document.querySelector("#user-name").value
  return getUserData()
  .then(users => userCheck(users, userNameInput))
}

//user sign up
function userSignUp(event) {
  event.preventDefault()
  const userNameInput = document.querySelector("#new-user-name").value
  const userHomeInput = parseInt(document.querySelector("#searchDirect").value)
  const vacationName = document.querySelector("#holiday-name").value
  const vacationStartDate = document.querySelector("#start-date").value
  const vacationEndDate = document.querySelector("#end-date").value
  const data = {
    user_name: userNameInput,
    home_base_id: userHomeInput,
    start_date: vacationStartDate,
    end_date: vacationEndDate,
    holiday_name: vacationName
  }
  return createUserData(data)
  .then(user => {
    console.log(user)
    sessionStorage.setItem("user_id", user.id);
    sessionStorage.getItem("user_id");
    sessionStorage.setItem("user_name", user.name);
    sessionStorage.getItem("user_name");
  })
  .then(() => {document.location.href = "search.html"})
}

function userCheck(data, userInfo) {
  const nameData = data.map(user => user.name)
  if (nameData.includes(userInfo)) {
    const userId = data.filter(user => user.name === userInfo)[0].id
    sessionStorage.setItem("user_id", userId);
    sessionStorage.getItem("user_id");
    sessionStorage.setItem("user_name", userInfo);
    sessionStorage.getItem("user_name");
    document.location.href = "search.html"
  } else {
    const alertSpace = document.querySelector("#index-alert")
    alertSpace.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    There's no matching user. Please check your name and password.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>`
  }
}
