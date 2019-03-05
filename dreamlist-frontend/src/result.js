const resultContainer = document.querySelector(".result-container")
resultContainer.innerHTML = "hey"



function cheapestDestination (user, odate , idate){
    oDate, idate 
    ocity from city 
    dcity collection from user 

    ecity loop{ city by city
        atoB
    }
    return 1 vacation period ranked list
}


function multipleVacations(user) {
    let periods = user.vacations
    periods.forEach(period => {
        let odate = period.start_date
        let idate = period.end_date
        multipleDestinations(user, odate, idate)
    })
}

function multipleDestinations(user, departDate, returnDate) {
    const listDestinations = user.dreamlists.map(list => Destination.find(list.destination_id))
    listDestinations.forEach(destination => atoBCheapestFlight(user, destination, departDate, returnDate))
}

function atoBCheapestFlight(user, destination, departDate, returnDate) {   
    const originAirports = user.home_base_airports_code
    const destinationAirports = destination.dreamlist_airports_code
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
}




