$(() => {
  // window.backendURL = "http://localhost:7000"
  window.backendURL = "https://final-project-dlag.onrender.com"
  var type = localStorage.getItem("type")
  var renterHeader =
    `
      <a href="LoginPage.html">Login/Sign up</a>
      <!-- <a href="Main.html">Home</a> -->
      <a href="PropertyBrowser.html">Listings</a>
    `
  var ownerHeader =
    `
      <a href="LoginPage.html">Login/Sign up</a>
      <!-- <a href="Main.html">Home</a> -->
      <a href="PropertyBrowser.html">Listings</a>
      <a href="ManageListings.html">Manage listings</a>
    `
  //get the filename of the current page
  //this is used to highlight the current page on the header
  var currentPage = window.location.pathname.split('/').pop();
  if (type == "renter") {
    $("header").append(renterHeader)
  } else if (type == "owner") {
    $("header").append(ownerHeader)
  }
  $(`a[href="${currentPage}"]`).addClass("currentPage")
})