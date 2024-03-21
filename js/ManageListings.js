
$(() => {
    //retrieve data from local storage
    var properties = JSON.parse(localStorage.getItem("properties"))

    //add data to list
    updateListingsList()

    //create new listing
    $("#createListing").submit((event) => {
        //prevent default behaviour (page refresh)
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

        //add data to array
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

        //update list
        updateListingsList()

        //clear form
        $("#propertyName").val("")
        $("#address").val("")
        $("#capacity").val("")
        $("#description").val("")
        $("#squareFt").val("")
        $("#price").val("")
        $("#parkingGarage").prop("checked", false)
        $("#publicTransit").prop("checked", false)
        $("#smoking").prop("checked", false)

        //set data in local storage for consistency
        localStorage.setItem("properties", JSON.stringify(properties))

        console.log(`Localstorage is ${JSON.stringify(localStorage.getItem("properties"))}`)
        console.log(`As array that is ${JSON.parse(localStorage.getItem("properties"))}`)

        $("#status").text("Listing created!")
    })
})

function updateListingsList() { 
    //retrieve data from localstorage
    var properties = JSON.parse(localStorage.getItem("properties"))

    console.log(properties)

    //add data to list
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
