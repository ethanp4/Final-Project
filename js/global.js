$(() => {
  var type = localStorage.getItem("type")
  var renterHeader =
    `
      <a href="LoginPage.html">Login/Sign up</a>
      <a href="Main.html">Home</a>
      <a href="PropertyBrowser.html">Listings</a>
    `

  var ownerHeader =
    `
      <a href="LoginPage.html">Login/Sign up</a>
      <a href="Main.html">Home</a>
      <a href="PropertyBrowser.html">Listings</a>
      <a href="ManageListings.html">Manage listings</a>
    `

  var currentPage = window.location.pathname.split('/').pop();
  console.log(currentPage);

  $(`a[href="${currentPage}"]`).addClass("currentPage")

  console.log(type)

  if (type == "renter") {
    $("header").html(renterHeader)
  } else if (type == "owner") {
    $("header").html(ownerHeader)
  }
})