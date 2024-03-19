$(() => {
    var properties = []

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

        $("#status").text("Listing created!")
    })
})
