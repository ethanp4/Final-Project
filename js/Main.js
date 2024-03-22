$(() => {
  var userData = JSON.parse(localStorage.getItem("userData"))
  
  //set welcome text
  $("#welcome").html(`Welcome ${userData[0].firstName}`)

})