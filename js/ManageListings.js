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

        if (checkIfListingExists(propertyName)) {
            return
        }

        //add data to beginning of array
        properties.unshift({
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

        //set data in local storage for consistency until we use nodejs
        localStorage.setItem("properties", JSON.stringify(properties))

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

        console.log(`Localstorage is ${JSON.stringify(localStorage.getItem("properties"))}`)
        console.log(`As array that is ${JSON.parse(localStorage.getItem("properties"))}`)

        $("#status").text("Listing created!")
    })

    //delete listing
    $(document).on("click", ".delete", (event) => {
        var propertyName = event.target.value
        var properties = JSON.parse(localStorage.getItem("properties"))
        properties = properties.filter((property) => property.propertyName != propertyName)
        localStorage.setItem("properties", JSON.stringify(properties))
        updateListingsList()
    })

    //edit listing
    $(document).on("click", ".edit", (event) => {
        var propertyName = event.target.value
        var properties = JSON.parse(localStorage.getItem("properties"))
        var property = properties.find((property) => property.propertyName == propertyName)
        // properties = properties.filter((property) => property.propertyName != propertyName)

        var editDiv = 
        `<div id="${property.propertyName}">
            <table>
                <tr>
                    <th>Property Name</th>
                    <td><input type="text" id="newName" value="${property.propertyName}"/></td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td><input type="text" id="newAddress" value="${property.address}"/></td>
                </tr>
                <tr>
                    <th>Capacity</th>
                    <td><input type="number" id="newCapacity" value="${property.capacity}"/></td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td><input type="text" id="newDescription" value="${property.description}"/></td>
                </tr>
                <tr>
                    <th>Square feet</th>
                    <td><input type="number" id="newSquareFt" value="${property.squareFt}"/></td>
                </tr>
                <tr>
                    <th>Price</th>
                    <td><input type="number" id="newPrice" value="${property.price}"/></td>
                </tr>
                <tr>
                    <th>Parking garage</th>
                    <td><input type="checkbox" id="newParkingGarage" ${property.parkingGarage?"checked":""} /></td>
                </tr>
                <tr>
                    <th>Public transit accessible</th>
                    <td><input type="checkbox" id="newPublicTransit" ${property.publicTransit?"checked":""} /></td>
                </tr>
                <tr>
                    <th>Smoking</th>
                    <td><input type="checkbox" id="newSmoking" ${property.smoking?"checked":""} /></td>
                </tr>
            </table>

            <button class="save" value="${property.propertyName}">Save</button>
        </div>`

        $(`#${propertyName} `)    

        console.log(`editing ${propertyName}`)
        $(`#${propertyName}`).replaceWith(editDiv)

        // $(`#${propertyName} #name`).replaceWith
        
        // .text()
        // var address = $(`#${propertyName} #address`).text()
        // var capacity = $(`#${propertyName} #capacity`).text()
        // var description = $(`#${propertyName} #description`).text()
        // var squareFt = $(`#${propertyName} #squareFt`).text()
        // var price = $(`#${propertyName} #price`).text()
        // var parkingGarage = $(`#${propertyName} #parkingGarage`).text()
        // var publicTransit = $(`#${propertyName} #publicTransit`).text()
        // var smoking = $(`#${propertyName} #smoking`).text()
        
        // localStorage.setItem("properties", JSON.stringify(properties))
        // updateListingsList()
    })
})

//update list
function updateListingsList() { 
    //retrieve data from localstorage
    var properties = JSON.parse(localStorage.getItem("properties"))

    //console.log(properties)

    //clear list
    $("#yourListings").html("")

    //add data to list
    properties.forEach(property => {
        $("#yourListings").append(`
        <div id="${property.propertyName}">
            <table>
            <style>th {text-align: left;}</style>
                <tr>
                    <th>Name:</th>
                    <td class="name">${property.propertyName}</td>
                </tr>
                <tr>
                    <th>Address:</th>
                    <td class="address">${property.address}</td>
                </tr>
                <tr>
                    <th>Capacity:</th>
                    <td class="capacity">${property.capacity}</td>
                </tr>
                <tr>
                    <th>Description:</th>
                    <td class="description">${property.description}</td>
                </tr>
                <tr>
                    <th>Square Ft:</th>
                    <td class="squareFt">${property.squareFt}</td>
                </tr>
                <tr>
                    <th>Price:</th>
                    <td class="price">${property.price}</td>
                </tr>
                <tr>
                    <th>Parking Garage:</th>
                    <td class="parkingGarage">${property.parkingGarage?"Yes":"No"}</td>
                </tr>
                <tr>
                    <th>Public Transit:</th>
                    <td class="publicTransit">${property.publicTransit?"Yes":"No"}</td>
                </tr>
                <tr>
                    <th>Smoking:</th>
                    <td class="smoking">${property.smoking?"Yes":"No"}</td>
                </tr>
            </table>
            <button class="delete" value="${property.propertyName}">Delete</button>
            <button class="edit" value="${property.propertyName}">Edit</button><br><br>
        </div>
        `)        
    });
}

function checkIfListingExists(name) {
    var properties = JSON.parse(localStorage.getItem("properties"))
    if (properties.some((property) => property.propertyName == name)) {
        $("#status").text("Listing already exists")
        return true
    }   
    return false
}
