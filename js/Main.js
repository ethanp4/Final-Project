$(() => {
  var name = localStorage.getItem("name")
  //set welcome text
  $("#welcome").html(`Welcome ${name}`)

})