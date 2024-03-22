$(() => {

  //initialise localstorage item to prevent errors
  if (localStorage.getItem("properties") == null) {
    localStorage.setItem("properties", JSON.stringify([]))
  }

  //update list containing div
  updateListingsList()

  //create new listing
  $("#createListing").submit((event) => {
    event.preventDefault()
    createListing()
  })

  $(document).on("click", ".delete", (event) => {
    event.preventDefault()

    //call the delete function with the property name as parameter
    deleteListing(event.target.value)
  })

  $(document).on("click", ".edit", (event) => {
    event.preventDefault()
    editListing(event.target.value)
  })
})

function updateListingsList() {
  //retrieve data from localstorage
  var properties = JSON.parse(localStorage.getItem("properties"))

  //clear div
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
                    <th><label for="newParkingGarage" class="parkingGarageLabel">Parking Garage:</label></th>
                    <td class="parkingGarage">${property.parkingGarage ? "Yes" : "No"}</td>
                </tr>
                <tr>
                    <th><label for="newPublicTransit" class="publicTransitLabel">Public Transit:</label></th>
                    <td class="publicTransit">${property.publicTransit ? "Yes" : "No"}</td>
                </tr>
                <tr>
                    <th><label for="newSmoking" class="smokingLabel">Smoking:</label></th>
                    <td class="smoking">${property.smoking ? "Yes" : "No"}</td>
                </tr>
            </table>
            <button class="delete" value="${property.propertyName}">Delete</button>
            <button class="edit" value="${property.propertyName}">Edit</button><br><br>
        </div>
        `)
  });
}

function deleteListing(propertyName) {
  var properties = JSON.parse(localStorage.getItem("properties"))
  var property = properties.find((property) => property.propertyName == propertyName)
  var index = properties.indexOf(property)

  properties.splice(index, 1)

  localStorage.setItem("properties", JSON.stringify(properties))
  updateListingsList()
}

function editListing(propertyName) {
  var properties = JSON.parse(localStorage.getItem("properties"))
  var property = properties.find((property) => property.propertyName == propertyName)
  var index = properties.indexOf(property)

  //modify td html for input
  $(`#${propertyName} .name`).html(`<input type="text" id="newName" value="${property.propertyName}"/>`)
  $(`#${propertyName} .address`).html(`<input type="text" id="newAddress" value="${property.address}"/>`)
  $(`#${propertyName} .capacity`).html(`<input type="number" id="newCapacity" value="${property.capacity}"/>`)
  $(`#${propertyName} .description`).html(`<input type="text" id="newDescription" value="${property.description}"/>`)
  $(`#${propertyName} .squareFt`).html(`<input type="number" id="newSquareFt" value="${property.squareFt}"/>`)
  $(`#${propertyName} .price`).html(`<input type="number" id="newPrice" value="${property.price}"/>`)
  $(`#${propertyName} .parkingGarage`).html(`<input type="checkbox" id="newParkingGarage" ${property.parkingGarage ? "checked" : ""} />`)
  $(`#${propertyName} .publicTransit`).html(`<input type="checkbox" id="newPublicTransit" ${property.publicTransit ? "checked" : ""} />`)
  $(`#${propertyName} .smoking`).html(`<input type="checkbox" id="newSmoking" ${property.smoking ? "checked" : ""} />`)

  //remove the delete and edit buttons
  $(`#${propertyName} .delete`).remove()
  $(`#${propertyName} .edit`).remove()

  //add a save button
  $(`#${propertyName} table`).append(`<button class="save" value="${property.propertyName}">Save</button>`)

  //set event listener for the save button
  $(`#${propertyName} .save`).click(() => {
    //create new var for new property
    var newProperty = {
      propertyName: $(`#${propertyName} #newName`).val(),
      address: $(`#${propertyName} #newAddress`).val(),
      capacity: $(`#${propertyName} #newCapacity`).val(),
      description: $(`#${propertyName} #newDescription`).val(),
      squareFt: $(`#${propertyName} #newSquareFt`).val(),
      price: $(`#${propertyName} #newPrice`).val(),
      parkingGarage: $(`#${propertyName} #newParkingGarage`).prop("checked"),
      publicTransit: $(`#${propertyName} #newPublicTransit`).prop("checked"),
      smoking: $(`#${propertyName} #newSmoking`).prop("checked")
    }

    properties[index] = newProperty
    localStorage.setItem("properties", JSON.stringify(properties))
    updateListingsList()
  })
}

function createListing() {
  var properties = JSON.parse(localStorage.getItem("properties"))

  var propertyName = $("#propertyName").val()
  var address = $("#address").val()
  var capacity = $("#capacity").val()
  var description = $("#description").val()
  var squareFt = $("#squareFt").val()
  var price = $("#price").val()
  var parkingGarage = $("#parkingGarage").prop("checked")
  var publicTransit = $("#publicTransit").prop("checked")
  var smoking = $("#smoking").prop("checked")

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
}

function checkIfListingExists(name) {
  var properties = JSON.parse(localStorage.getItem("properties"))
  if (properties.some((property) => property.propertyName == name)) {
    $("#status").text("Listing already exists")
    return true
  }
  return false
}
