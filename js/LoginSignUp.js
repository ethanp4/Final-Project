$(() => {
  //initialise localstorage items if they dont exist to avoid errors
  if (localStorage.getItem("userData") == null) {
    localStorage.setItem("userData", JSON.stringify([]))
  }
  if (localStorage.getItem("properties") == null) {
    localStorage.setItem("properties", JSON.stringify([]))
  }

  //if the user is already signed in, if the item isnt initialised it evaluates as false
  if (localStorage.getItem("signedIn") == "true") {
    console.log("signed in")
    $("#signInStatus").html("Youre already signed in")
    $("#signInStatus").append("<br><a href='Main.html'>Go to main page</a>")
    $("#signInStatus").append("<br><a id='signOut' href='LoginPage.html'>Sign out</a>")

    $("#signOut").click(() => { signOut() })

    $("input").prop("disabled", true)
    $("button").prop("disabled", true)

    //because i disabled all buttons this re-enables this one
    $("#clearLocalstorage").prop("disabled", false)
  }

  $("#signUp").submit((event) => {
    event.preventDefault()
    signUp()
  })

  $("#signIn").submit((event) => {
    event.preventDefault()
    signIn()
  })

  $("#exampleData").click(() => {
    var exampleUserData = [{ username: "user", password: "pass", firstName: "John", lastName: "Doe", email: "pQWp6@example.com", phone: "123456789" }]
    var exampleListingsData = [{ propertyName: "House", address: "123 Main St", capacity: 4, description: "A beautiful house", squareFt: 1000, price: 100, parkingGarage: true, publicTransit: false, smoking: false, rating: 0, ratingCount: 0 }, { propertyName: "Apartment", address: "456 Main St", capacity: 2, description: "A beautiful apartment", squareFt: 500, price: 50, parkingGarage: false, publicTransit: true, smoking: false, rating: 15, ratingCount: 3 }, { propertyName: "Office", address: "789 Main St", capacity: 10, description: "A beautiful office", squareFt: 2000, price: 200, parkingGarage: true, publicTransit: true, smoking: true, rating: 3, ratingCount: 1 }]

    localStorage.setItem("userData", JSON.stringify(exampleUserData))
    localStorage.setItem("properties", JSON.stringify(exampleListingsData))

    $("#username").val(exampleUserData[0].username)
    $("#password").val(exampleUserData[0].password)
    $("#signInStatus").html("Example data loaded")
  })
})

function checkIfUserExists(username) {
  var userData = JSON.parse(localStorage.getItem("userData"))

  if (userData.some((user) => user.username == username)) {
    return true
  }

  return false
}

function signUp() {
  var userData = JSON.parse(localStorage.getItem("userData"))

  username = $("#newUsername").val()
  password = $("#newPassword").val()

  firstName = $("#firstName").val()
  lastName = $("#lastName").val()
  email = $("#email").val()
  phone = $("#phone").val()

  //check if user already exists
  if (checkIfUserExists(username)) {
    $("#signUpStatus").html("This username is already in use")
    return
  }

  if (password != $("#confirmPassword").val()) {
    $("#signUpStatus").html("Passwords do not match")
    return
  }

  //add to array
  userData.push({
    "id": userData.length + 1,
    "username": username,
    "password": password,
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "phone": phone
  })

  //set local storage
  localStorage.setItem("userData", JSON.stringify(userData))
  localStorage.setItem("signedIn", "true")

  localStorage.setItem("name", `${firstName} ${lastName}`)

  window.location.href = "Main.html"
}

function signIn() {
  var userData = JSON.parse(localStorage.getItem("userData"))

  var username = $("#username").val()
  var password = $("#password").val()

  if (userData.some((user) => user.username == username && user.password == password)) {
    $("#signInStatus").html("Login successful")
    localStorage.setItem("signedIn", "true")

    var user = userData.find((user) => user.username == username)

    localStorage.setItem("name", `${user.firstName} ${user.lastName}`)

    window.location.href = "Main.html"
  } else {
    $("#signInStatus").html("Login failed")
  }
}

function signOut() {
  localStorage.setItem("signedIn", "false")
  window.location.href = "LoginPage.html"
}