const resultContainer = document.querySelector(".result-container")
const cardDeck = document.querySelector(".card-deck-customize")

// rendering price infos
function renderFlightInfos(realFinalPrices) { // [{}, {}]
    realFinalPrices.forEach(data => renderFlightInfo(data))
}

function renderFlightInfo(data) { //{vacation: {vacation instance}, prices: [{city: London, price: 234}], periods: ""}

// `${data.vacation.start_date} - ${data.vacation.end_date}`
    const card = document.createElement("div")
    card.className = "card"
    card.dataset.id = data.vacation.id

    const cardHeader = document.createElement("div")
    cardHeader.className = "card-header"
    cardHeader.innerText = `${data.vacation.name}`
    const cardBody = document.createElement("div")
    cardBody.className = "card-body"
    const table = document.createElement("table")
    table.className = "table"
    const tHead = document.createElement("thead")
    const tr_head = document.createElement("tr")
    tr_head.innerHTML = `
        <th scope="col"></th>
        <th scope="col">City</th>
        <th scope="col">Cheapest Price</th>
        <th scope="col">Go Booking</th>
    `
    tHead.appendChild(tr_head)
    table.appendChild(tHead)
    const tBody = document.createElement("tbody")

    let counter = 1
    data.prices.forEach(priceObj => {
        const tr_body = document.createElement("tr")
        tr_body.innerHTML = `
            <th scope="row">${counter++}</th>
            <td>${priceObj.city}</td>
            <td>$${priceObj.price} <small class="text-muted">${priceObj.direct ? "(direct)" : ""}</small></td>
            `
        const td = document.createElement("td")
        const btn = document.createElement("button")
        btn.id = "redirect-skyscanner"
        btn.innerHTML = `<i class="fas fa-plane-departure"></i>`
        btn.onclick = function () {
            location.href = `https://www.skyscanner.com/transport/flights/${priceObj.destinationAirportCode}/${priceObj.originAirportCode}/${priceObj.departDate}/${priceObj.returnDate}/?adults=1&children=0&adultsv2=1&childrenv2=&infants=0&cabinclass=economy&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home#results.com`
        }

        td.appendChild(btn)
        tr_body.appendChild(td)
        tBody.appendChild(tr_body)
    })
    table.appendChild(tBody)
    cardBody.appendChild(table)

    const cardFooter = document.createElement("div")
    cardFooter.className = "card-footer"
    const smallInfo = document.createElement("small")
    smallInfo.className = "text-muted"
    smallInfo.innerText = `From ${data.vacation.start_date} To ${data.vacation.end_date}`

    cardFooter.appendChild(smallInfo)

    card.append(cardHeader, cardBody, cardFooter)
    cardDeck.appendChild(card)
}



/// Get the cheapest price (skyscanner)
async function multipleVacations(user) {
    let realFinalPrices = []
    const periods = user.vacations

    const cheapestForVacations = periods.map(async period => {
        let departDate = period.start_date
        let returnDate = period.end_date
        const vacationPrices = await multipleDestinations(user, departDate, returnDate)
        let holiday = {}
        holiday["vacation"] = period
        holiday["prices"] = vacationPrices 
        realFinalPrices.push(holiday)
    })

    await Promise.all(cheapestForVacations)
    
    realFinalPrices.sort((a,b) => b.vacation.start_date - a.vacation.start_date)
    console.log(realFinalPrices)
    return realFinalPrices
}

async function multipleDestinations(user, departDate, returnDate) {
    let destinationsPrices = []
    const destinations = await getDestinations(user.id)
    
    const cheapestForDestinations = destinations.map(async destination => {
        const cheapestPrice = await atoBCheapestFlight(user, destination, departDate, returnDate)
        if (cheapestPrice !== undefined) {
            let place = {}
            place["city"] = destination.name
            place["price"] = cheapestPrice.price
            place["direct"] = cheapestPrice.direct
            place["originAirportCode"] = cheapestPrice.originAirportCode
            place["destinationAirportCode"] = cheapestPrice.destinationAirportCode
            place["departDate"] = cheapestPrice.departDate
            place["returnDate"] = cheapestPrice.returnDate
            destinationsPrices.push(place)
        }
    }) 

    await Promise.all(cheapestForDestinations)
    destinationsPrices.sort((a,b) => a.price - b.price)

    return destinationsPrices
}

async function atoBCheapestFlight(user, destination, departDate, returnDate) {
    const [originAirports, destinationAirports] = await Promise.all([getHomeAirportCodes(user.id), getDestinationAirports(destination.id)])
    let prices = []
    let filteredPrices

    const getSkyscannerPrice = async (originAirport, destinationAirport) => {
        const flight = await skyscannerAPI(originAirport, destinationAirport, departDate, returnDate)
        prices.push(flight)
        // console.log(flight)
        return flight
    }

    const getAllDestinationPrices = async originAirport => Promise.all(
        destinationAirports.map(destinationAirport => getSkyscannerPrice(originAirport, destinationAirport))
    )

    const skyscannerRequests = originAirports.map(getAllDestinationPrices)

    await Promise.all(skyscannerRequests)
    
    
    filteredPrices = prices.filter(price => price !== undefined)
    filteredPrices.sort((a,b) => a.price-b.price)
    return filteredPrices[0]
}

function skyscannerAPI(originAirport, destinationAirport, departDate, returnDate) {
    const options = {
        headers: {
            "X-RapidAPI-Key": "567356378cmshd62769e12f75fd4p14f62cjsn6b1c2336a0fd"
        }
    }
    return fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${originAirport}/${destinationAirport}/${departDate}?inboundpartialdate=${returnDate}`, options)

        .then(res => res.json())
        .then(json => {
            if ('ValidationErrors' in json)
                return Promise.reject(json)
            else
                console.log(json)
                return {
                    price: json.Quotes[0].MinPrice, 
                    direct: json.Quotes[0].Direct, 
                    originAirportCode: json.Places[0].IataCode,
                    destinationAirportCode: json.Places[1].IataCode,
                    departDate: departDate,
                    returnDate: returnDate
                }

            })
        .catch(error => console.error(error))

}

// function getFlightInfo(data, country, departDate, returnDate) {
//     const price = data.Quotes[0].MinPrice, country, departDate, returnDate])

// }

function init(user_id) {
    getUser(user_id)
    .then(realFinalPrices => renderFlightInfos(realFinalPrices))
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




init(sessionStorage.user_id)




