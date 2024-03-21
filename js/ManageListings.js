$(() => {
    var properties = JSON.parse(localStorage.getItem("properties"))

    updateListingsList()

    $("#createListing").submit((event) => {
        event.preventDefault()

        var propertyName = $("#propertyName").val()
        var address = $("#address").val()
        var capacity = $("#capacity").val()
        var description = $("#description").val()
        var squareFt = $("#squareFt").val()
        var price = $("#price").val()
        var parkingGarage = $("#parkingGarage").is(":checked")
        var publicTransit = $("#publicTransit").is(":checked")
        var smoking = $("#smoking").is(":checked")

        properties.push({
            "propertyName": propertyName,
            "address": address,
            "capacity": capacity,
            "description": description,
            "squareFt": squareFt,
            "price": price,
            "parkingGarage": parkingGarage,
            "publicTransit": publicTransit,
            "smoking": smoking
        })

        $("#yourListings").append(`
            <div>
                <h4>${propertyName}</h4>
                <p>${address}</p>
                <p>${capacity}</p>
                <p>${description}</p>
                <p>${squareFt}</p>
                <p>${price}</p>
                <p>Parking Garage: ${parkingGarage?"Yes":"No"}</p>
                <p>Public Transit: ${publicTransit?"Yes":"No"}</p>
                <p>Smoking: ${smoking?"Yes":"No"}</p>
            </div>
        `)

        $("#propertyName").val("")
        $("#address").val("")
        $("#capacity").val("")
        $("#description").val("")
        $("#squareFt").val("")
        $("#price").val("")
        $("#parkingGarage").prop("checked", false)
        $("#publicTransit").prop("checked", false)
        $("#smoking").prop("checked", false)

        localStorage.setItem("properties", JSON.stringify(properties))

        console.log(`Localstorage is ${JSON.stringify(localStorage.getItem("properties"))}`)
        console.log(`As array that is ${JSON.parse(localStorage.getItem("properties"))}`)

        $("#status").text("Listing created!")
    })
})

function updateListingsList() { 
    var properties = JSON.parse(localStorage.getItem("properties"))

    console.log(properties)

    properties.forEach(property => {
        $("#yourListings").append(`
        <div>
            <h4>${property.propertyName}</h4>
            <p>${property.address}</p>
            <p>${property.capacity}</p>
            <p>${property.description}</p>
            <p>${property.squareFt}</p>
            <p>${property.price}</p>
            <p>Parking Garage: ${property.parkingGarage?"Yes":"No"}</p>
            <p>Public Transit: ${property.publicTransit?"Yes":"No"}</p>
            <p>Smoking: ${property.smoking?"Yes":"No"}</p>
        </div>
        
        `)        
    });
}
