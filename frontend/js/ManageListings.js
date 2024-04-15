$(() => {
  //update list containing div
  updateListingsList()

  //create new listing
  $("#createListing").submit((event) => {
    event.preventDefault()
    createListing()
  })

  $(document).on("click", ".delete", (event) => {
    //call the delete function with the property name as parameter
    deleteListing(event.target.value)
  })

  $(document).on("click", ".edit", (event) => {
    editListing(event.target.value)
  })
})

function updateListingsList() {
  //clear div
  $("#yourListings").html("")

  // properties = properties.filter(property => property.owner == localStorage.getItem("username"))

  $.ajax({
    url: `${window.backendURL}/users/${localStorage.getItem("userID")}/properties`,
    type: "GET",
    success: (properties) => {
      // console.log(`All matching properties for user: ${localStorage.getItem("userID")}`)
      // console.log(properties)
      properties.forEach(property => {
        $("#yourListings").append(`
            <div class="property" id="${property._id}">
              <table>
              <style>th {text-align: left;}</style>
                <tr>
                  <th>Name:</th>
                  <td class="name">${property.name}</td>
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
              <button class="delete" value="${property._id}">Delete</button>
              <button class="edit" value="${property._id}">Edit</button><br><br>
            </div>
            `)
      });
      setWidths()
    }
  })
}

function deleteListing(propertyID) {
  $.ajax({
    url: `${window.backendURL}/users/${localStorage.getItem("userID")}/properties/${propertyID}`,
    type: "DELETE",
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`)
    },
    success: () => {
      updateListingsList()
    }
  })
}

function editListing(propertyID) {

  $.ajax({
    url: `${window.backendURL}/users/${localStorage.getItem("userID")}/properties/${propertyID}`,
    type: "GET",
    success: (res) => {
      var property = res.property
      $(`#${propertyID} .name`).html(`<input type="text" id="newName" value="${property.name}"/>`)
      $(`#${propertyID} .address`).html(`<input type="text" id="newAddress" value="${property.address}"/>`)
      $(`#${propertyID} .capacity`).html(`<input type="number" id="newCapacity" value="${property.capacity}"/>`)
      $(`#${propertyID} .description`).html(`<input type="text" id="newDescription" value="${property.description}"/>`)
      $(`#${propertyID} .squareFt`).html(`<input type="number" id="newSquareFt" value="${property.squareFt}"/>`)
      $(`#${propertyID} .price`).html(`<input type="number" id="newPrice" value="${property.price}"/>`)
      $(`#${propertyID} .parkingGarage`).html(`<input type="checkbox" id="newParkingGarage" ${property.parkingGarage ? "checked" : ""} />`)
      $(`#${propertyID} .publicTransit`).html(`<input type="checkbox" id="newPublicTransit" ${property.publicTransit ? "checked" : ""} />`)
      $(`#${propertyID} .smoking`).html(`<input type="checkbox" id="newSmoking" ${property.smoking ? "checked" : ""} />`)

      //remove the delete and edit buttons
      $(`#${propertyID} .delete`).remove()
      $(`#${propertyID} .edit`).remove()

      //add a save button
      $(`#${propertyID} table`).append(`<button class="save" value="${property.propertyID}">Save</button>`)

      //set event listener for the save button
      $(`#${propertyID} .save`).click(() => {

        $.ajax({
          url: `${window.backendURL}/users/${localStorage.getItem("userID")}/properties/${propertyID}`,
          type: "PUT",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`)
          },
          data: {
            name: $(`#${propertyID} #newName`).val(),
            address: $(`#${propertyID} #newAddress`).val(),
            capacity: $(`#${propertyID} #newCapacity`).val(),
            description: $(`#${propertyID} #newDescription`).val(),
            squareFt: $(`#${propertyID} #newSquareFt`).val(),
            price: $(`#${propertyID} #newPrice`).val(),
            parkingGarage: $(`#${propertyID} #newParkingGarage`).prop("checked"),
            publicTransit: $(`#${propertyID} #newPublicTransit`).prop("checked"),
            smoking: $(`#${propertyID} #newSmoking`).prop("checked")
          },
          success: () => {
            updateListingsList()
          }
        })

        // //modify property object
        // property.propertyName = $(`#${propertyName} #newName`).val()
        // property.address = $(`#${propertyName} #newAddress`).val()
        // property.capacity = $(`#${propertyName} #newCapacity`).val()
        // property.description = $(`#${propertyName} #newDescription`).val()
        // property.squareFt = $(`#${propertyName} #newSquareFt`).val()
        // property.price = $(`#${propertyName} #newPrice`).val()
        // property.parkingGarage = $(`#${propertyName} #newParkingGarage`).prop("checked")
        // property.publicTransit = $(`#${propertyName} #newPublicTransit`).prop("checked")
        // property.smoking = $(`#${propertyName} #newSmoking`).prop("checked")

        updateListingsList()
      })

    }
  })

}

// this function has been converted to use db
function createListing() {
  // var properties = JSON.parse(localStorage.getItem("properties"))

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

  $.ajax({
    type: "POST",
    url: `${window.backendURL}/properties`,
    data: {
      ownerID: localStorage.getItem("userID"),
      name: propertyName,
      address: address,
      capacity: capacity,
      description: description,
      squareFt: squareFt,
      price: price,
      parkingGarage: parkingGarage,
      publicTransit: publicTransit,
      smoking: smoking
    },
    success: (response) => {
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

      $("#status").text("Listing created!")

      console.log(response)
    },
    error: (error) => {
      $("#status").text("Error creating listing")
      console.log(error)
    }
  })

  // //add data to beginning of array
  // properties.unshift({
  //   "owner": localStorage.getItem("username"),
  //   "propertyName": propertyName,
  //   "address": address,
  //   "capacity": capacity,
  //   "description": description,
  //   "squareFt": squareFt,
  //   "price": price,
  //   "parkingGarage": parkingGarage,
  //   "publicTransit": publicTransit,
  //   "smoking": smoking,
  //   "rating": 0,
  //   "ratingCount": 0
  // })

  // //set data in local storage for consistency until we use nodejs
  // localStorage.setItem("properties", JSON.stringify(properties))

}

function checkIfListingExists(name) {
  var properties = JSON.parse(localStorage.getItem("properties"))
  if (properties.some((property) => property.propertyName == name)) {
    $("#status").text("Listing already exists")
    return true
  }
  return false
}

//set the width of each property to the widest one so they align properly
function setWidths() {
  let maxWidth = 0

  $(".property").each(function () {
    if ($(this).width() > maxWidth) {
      maxWidth = $(this).width()
    }
  })

  // console.log(`Max width: ${maxWidth}`)
  $(".property").css("width", maxWidth)
}