$(() => {
  //initialise localstorage item to prevent errors
  if (localStorage.getItem("properties") == null) {
    localStorage.setItem("properties", JSON.stringify([]))
  }

  //update list containing div
  updateListingsList()

})

function updateListingsList() {
  //retrieve data from localstorage
  var properties = JSON.parse(localStorage.getItem("properties"))

  //clear div
  $("#propertyList").html("")

  //add data to list
  properties.forEach(property => {
    $("#propertyList").append(`
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
    </div><br>
    `)
  })
}