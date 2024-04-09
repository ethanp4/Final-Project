$(() => {
  //initialise localstorage item to prevent errors
  if (localStorage.getItem("properties") == null) {
    localStorage.setItem("properties", JSON.stringify([]))
  }

  updateListingsList()

  $("input, select").on("input", (event) => {
    //if the filter is empty its label will be normal
    if ((event.target.type == "number" || event.target.type == "text") && event.target.value == "") {
      $(`label[for=${event.target.id}]`).css("font-weight", "normal")
    } else {
      //when a filter is active its label will be bold
      $(`label[for=${event.target.id}]`).css("font-weight", "bold")
    }

    updateListingsList()
  })

  //reset each filter
  $(document).on("click", ".reset", (event) => {
    switch (event.target.value) {
      case "all":
        $("input[type=text], input[type=number]").val("")
        $("input[type=checkbox]").prop("checked", false)

        $("label").css("font-weight", "normal")
        break
      case "capacity":
        $("#capacityFrom").val("")
        $("#capacityTo").val("")

        $("label[for=capacityFrom], label[for=capacityTo]").css("font-weight", "normal")
        break
      case "squareFt":
        $("#squareFtFrom").val("")
        $("#squareFtTo").val("")

        $("label[for=squareFtFrom], label[for=squareFtTo]").css("font-weight", "normal")
        break
      case "parkingGarage":
        $("#parkingGarage").prop("checked", false)

        $("label[for=parkingGarage]").css("font-weight", "normal")
        break
      case "publicTransit":
        $("#publicTransit").prop("checked", false)

        $("label[for=publicTransit]").css("font-weight", "normal")
        break
      case "smoking":
        $("#smoking").prop("checked", false)

        $("label[for=smoking]").css("font-weight", "normal")
        break
    }
    updateListingsList()
  })
})

function filterList(properties) {
  let filter = $("#filter").val().toLowerCase()
  let filterBy = $("#filterBy").val()

  let filteredProperties = properties

  var unfiltered = $("label").toArray().some((label) => {
    return $(label).css("font-weight") == "700"
  })

  //if no filters are applied then return the original list
  if (!unfiltered) {
    return properties
  }

  //filter by name
  if (filter != "") {
    switch (filterBy) {
      case "Name":
        filteredProperties = filteredProperties.filter((property) => {
          return property.name.toLowerCase().includes(filter)
        })
        break
      case "Address":
        filteredProperties = filteredProperties.filter((property) => {
          return property.address.toLowerCase().includes(filter)
        })
        break
      case "Description":
        filteredProperties = filteredProperties.filter((property) => {
          return property.description.toLowerCase().includes(filter)
        })
    }
  }

  //filter by capacity
  //from
  if ($("label[for=capacityFrom]").css("font-weight") == "700") {
    filteredProperties = filteredProperties.filter((property) => {
      return property.capacity >= $("#capacityFrom").val()
    })
  }
  //to
  if ($("label[for=capacityTo]").css("font-weight") == "700") {
    filteredProperties = filteredProperties.filter((property) => {
      return property.capacity <= $("#capacityTo").val()
    })
  }

  //filter by square ft
  //from
  if ($("label[for=squareFtFrom]").css("font-weight") == "700") {
    filteredProperties = filteredProperties.filter((property) => {
      return property.squareFt >= $("#squareFtFrom").val()
    })
  }
  //to
  if ($("label[for=squareFtTo]").css("font-weight") == "700") {
    filteredProperties = filteredProperties.filter((property) => {
      return roperty.squareFt <= $("#squareFtTo").val()
    })
  }

  //filter by parking
  if ($("label[for=parkingGarage]").css("font-weight") == "700") {
    filteredProperties = filteredProperties.filter((property) => {
      return property.parkingGarage == $("#parkingGarage").prop("checked")
    })
  }

  //filter by transit
  if ($("label[for=publicTransit]").css("font-weight") == "700") {
    filteredProperties = filteredProperties.filter((property) => {
      return property.publicTransit == $("#publicTransit").prop("checked")
    })
  }

  //filter by smoking
  if ($("label[for=smoking]").css("font-weight") == "700") {
    filteredProperties = filteredProperties.filter((property) => {
      return property.smoking == $("#smoking").prop("checked")
    })
  }

  return filteredProperties
}

function updateListingsList() {
  //retrieve data from localstorage

  //should update this to only fetch the data per page load 
  $.ajax({
    url: `${window.backendURL}/properties`,
    type: "GET",
    success: (properties) => {
      console.log("All properties")
      console.log(properties)

      var filteredProperties = filterList(properties)

      //clear div
      $("#propertyList").html("")

      //if no properties found
      if (filteredProperties.length == 0) {
        $("#propertyList").text("No listings found")
        return
      }

      //add data to list
      filteredProperties.forEach(property => {
        $("#propertyList").append(`
          <div class="property" id="${property.name}">
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
                <tr>
                  <td><a href="ListingDetails.html?propertyName=${property.propertyName}">View Details</a></td>
                </tr>
              </table>
          </div><br>
        `)
      })

      setWidths()
    }
  })


}

//set the width of each property to the widest one so they align properly
function setWidths() {
  let maxWidth = 0

  $(".property").each(function () {
    if ($(this).width() > maxWidth) {
      maxWidth = $(this).width()
    }
  })

  $(".property").css("width", maxWidth)
}