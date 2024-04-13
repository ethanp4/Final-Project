$(() => {
  //initialise localstorage item to prevent errors
  if (localStorage.getItem("properties") == null) {
    localStorage.setItem("properties", JSON.stringify([]))
  }

  var properties = JSON.parse(localStorage.getItem("properties"))

  //get property name from url
  var url = new URL(window.location.href);
  var propertyID = url.searchParams.get("propertyName");
  $.ajax({
    url: `${window.backendURL}/properties/${propertyID}`,
    type: 'GET',
    success: (property) => {

      //set title
      $("#title").text(`Details for ${property.name}`)

      //set data
      $("#name").text(property.name)
      $("#address").text(property.address)
      $("#capacity").text(property.capacity)
      $("#description").text(property.description)
      $("#squareFt").text(property.squareFt)
      $("#price").text(property.price)
      $("#parkingGarage").text(property.parkingGarage ? "Yes" : "No")
      $("#publicTransit").text(property.publicTransit ? "Yes" : "No")
      $("#smoking").text(property.smoking ? "Yes" : "No")

      $("#rating").text(property.rating == 0 ? "No ratings yet" : `${(property.rating / property.ratingCount).toFixed(1)}/5`)
      $("#ratingCount").text(property.ratingCount == 0 ? "No ratings yet" : `${property.ratingCount}`)

      $("#submitRating").click(() => {
        rateProperty(property._id)
      })

      //enable and disable submit button
      $("#userRating").change(() => {
        if ($("#userRating").val() != "null") {
          $("#submitRating").prop("disabled", false)
        } else {
          $("#submitRating").prop("disabled", true)
        }
      })
    },
    error: () => {
      //if theres no valid property in the url bar then redirect to the browser
      window.location.href = "PropertyBrowser.html"
    }
  })

})

function rateProperty(id) {
  $.ajax({
    url: `${window.backendURL}/properties/${id}/submitrating`,
    type: 'POST',
    data: {
      rating: $("#userRating").val()
    },
    success: (res) => {
      console.log(res)
      $("#status").text("Rating submitted!")
      $("#submitRating").prop("disabled", true)
      $("#rating").text(res.newRating)
      $("#ratingCount").text(res.newCount)
    },
    error: (err) => {
      console.log(err)
    }
  })

}