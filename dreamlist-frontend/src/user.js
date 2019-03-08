function getUserData() {
    return fetch(`http://localhost:3000/users`)
    .then(res => res.json())
    .then(data => data.filter(user => user.id === parseInt(sessionStorage.user_id) ))
} //user.vacations {id, start_date, end_date, name}

function getHomebase(id) {
    return fetch(`http://localhost:3000/destinations/${id}/getHomebase`)
    .then(res => res.json())
    .then(destination => destination.name)
}

function addVacationData(data) {
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }
    return fetch(`http://localhost:3000/vacations`, options)
    .then(res => res.json())
}

function deleteVacationData(id) {
    return fetch(`http://localhost:3000/vacations/${id}`, {method: "DELETE"})
}


//render
async function renderUserInfo(user) {
    const userName = document.querySelector(".info-user-name")
    userName.innerText = `Name: ${user[0].name}`
    const userHomebase = document.querySelector(".info-user-homebase")
    userHomebase.innerText = `Home City: ${await getHomebase(user[0].home_base_id)}`
}

const divVacation = document.querySelector(".info-user-vacation")

function renderVacations(vacations) {
    divVacation.innerHTML = ""
    divVacation.innerHTML = "<h2 id='vascation-title'>Your Vacations</h2>"
    const table = document.createElement("table")
    table.className = "table table-vacation"
    const tHead = document.createElement("thead")
    const tr_head = document.createElement("tr")
    tr_head.innerHTML = `
        <th scope="col"></th>
        <th scope="col">Name</th>
        <th scope="col">Date</th>
        <th scope="col">Delete</th>
    `
    tHead.appendChild(tr_head)
    table.appendChild(tHead)

    const tBody = document.createElement("tbody")
    let counter = 1
    vacations.forEach(vacation => {
        const tr_body = document.createElement("tr")
        tr_body.innerHTML = `
            <th scope="row">${counter++}</th>
            <td>${vacation.name}</td>
            <td>${vacation.start_date} ~ ${vacation.end_date}</td>
            `
        const td = document.createElement("td")
        const btn = document.createElement("button")
        btn.className = "delete-btn"
        btn.dataset.id = vacation.id
        btn.innerHTML = `<button type="button" class="btn btn-light"><i class="fas fa-trash-alt"></i></button>`
        btn.addEventListener("click", e => {
            deleteVacationData(vacation.id)
            .then(() => getUserData()
                .then(user => renderVacations(user[0].vacations)))
            })
        td.appendChild(btn)
        tr_body.appendChild(td)
        tBody.appendChild(tr_body)
    })
    table.appendChild(tBody)

    const addBtn = document.createElement("button")
    addBtn.innerText = "Add Vacation"
    addBtn.className = "btn btn-info"
    addBtn.addEventListener("click", e => {
        renderAddVacationForm(e)
    })
    divVacation.append(table, addBtn)
}

function renderAddVacationForm(e) {
    const addFormDiv = document.querySelector(".add-vacation")
    addFormDiv.style.display === "none" ? addFormDiv.style.display = "block" : addFormDiv.style.display = "none"
}

function addNewVacation(event) {
    event.preventDefault()
    console.log(event.target.elements)
    const vacationName = event.target.elements["holiday-name"].value
    const vacationStart = event.target.elements["trip-start"].value
    const vacationEnd = event.target.elements["trip-end"].value
    const data = {name: vacationName, start_date: vacationStart, end_date: vacationEnd, user_id: sessionStorage.user_id}
    event.target.reset()

    addVacationData(data)
    .then(() => getUserData()
        .then(user => renderVacations(user[0].vacations)))
}


function init() {
    const addForm = document.querySelector("#add-vacation-form")
    addForm.addEventListener("submit", event => addNewVacation(event))
    getUserData()
    .then(user => {
        renderUserInfo(user)
        renderVacations(user[0].vacations)
    })
}

init()
