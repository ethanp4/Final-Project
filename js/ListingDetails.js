$(() => {
  //initialise localstorage item to prevent errors
  if (localStorage.getItem("properties") == null) {
    localStorage.setItem("properties", JSON.stringify([]))
  }

  var properties = JSON.parse(localStorage.getItem("properties"))

  //get property name from url
  var url = new URL(window.location.href);
  var propertyName = url.searchParams.get("propertyName");
  var property = properties.find((property) => property.propertyName == propertyName)

  //set title
  $("#title").text(`Details for ${propertyName}`)

  //set data
  $("#name").text(property.propertyName)
  $("#address").text(property.address)
  $("#capacity").text(property.capacity)
  $("#description").text(property.description)
  $("#squareFt").text(property.squareFt)
  $("#price").text(property.price)
  $("#parkingGarage").text(property.parkingGarage ? "Yes" : "No")
  $("#publicTransit").text(property.publicTransit ? "Yes" : "No")
  $("#smoking").text(property.smoking ? "Yes" : "No")
})