const resultContainer = document.querySelector(".result-container")
resultContainer.innerHTML = "hey"


function multipleVacations(user) {
    let periods = user.vacations
    periods.forEach(period => {
        let departDate = period.start_date
        let returnDate = period.end_date
        multipleDestinations(user, departDate, returnDate)
    })
}

function multipleDestinations(user, departDate, returnDate) {
    getDestinations(user.id)
        .then(destinations => {destinations.forEach(destination => atoBCheapestFlight(user, destination, departDate, returnDate))})
        // debugger
}

async function atoBCheapestFlight(user, destination, departDate, returnDate) { 
    const airports = await Promise.all([getHomeAirportCodes(user.id), getDestinationAirports(destination.id)])
    const originAirports = airports[0]
    const destinationAirports = airports[1]
    // debugger;
    originAirports.forEach(originAirport => {
        destinationAirports.forEach(destinationAirport => {
             skyscannerAPI(originAirport, destinationAirport, departDate, returnDate)
        })
    })
}

function skyscannerAPI(originAirport, destinationAirport, departDate, returnDate){
    const options = {
        headers:{
            "X-RapidAPI-Key": "567356378cmshd62769e12f75fd4p14f62cjsn6b1c2336a0fd"
        }
    }
 
    return fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${originAirport}/${destinationAirport}/${departDate}?inboundpartialdate=${returnDate}`, options)

    .then(res => res.json())
    .then(json => console.log(json))

    // .catch(error => console.log(error.request))

}    



// get datas from api //

function getUser(user_id) {
    return fetch(`http://localhost:3000/users/${user_id}`)
    .then(res => res.json())
    .then(user => multipleVacations(user))
}

function getDestinations(user_id) {
    return fetch(`http://localhost:3000/users/${user_id}/listDestinations`)
    .then(res => res.json())
}

function getHomeAirportCodes(user_id) {
    return fetch(`http://localhost:3000/users/${user_id}/homeAirportCodes`)
    .then(res => res.json())
}

function getDestinationAirports(destination_id) {
    return fetch(`http://localhost:3000/destinations/${destination_id}/destinationAirports`)
    .then(res => res.json())
}


getUser(2)

