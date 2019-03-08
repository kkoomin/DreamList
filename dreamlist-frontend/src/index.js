// rendering username
const navUser = document.querySelector("#nav-user-id")
function setUserGreet() {
    const sessionUserName = sessionStorage.user_name
    if(sessionUserName !== undefined) {
        navUser.innerText = `Welcome! ${sessionUserName} ☀️`
    } else {
        navUser.innerText = "Welcome!"
    }
}

setUserGreet()


