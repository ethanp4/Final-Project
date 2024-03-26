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

    $("select").hide()
    $("input").hide()
    $("button").hide()
    $("h3").hide()
    $("h4").hide()

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
    loadExampleData()

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

  type = $("#accountType").val()

  //must select an account type
  if (type == "none") {
    $("#signUpStatus").html("Please select an account type")
    return
  }

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
    "type": type,
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

  localStorage.setItem("type", type)
  localStorage.setItem("name", `${firstName} ${lastName}`)

  switch (type) {
    case "renter":
      window.location.href = "PropertyBrowser.html"
      break
    case "owner":
      window.location.href = "ManageListings.html"
      break
  }
}

function signIn() {
  var userData = JSON.parse(localStorage.getItem("userData"))

  var username = $("#username").val()
  var password = $("#password").val()

  if (userData.some((user) => user.username == username && user.password == password)) {
    $("#signInStatus").html("Login successful")
    localStorage.setItem("signedIn", "true")

    var user = userData.find((user) => user.username == username)

    console.log(user.type)
    localStorage.setItem("type", user.type)
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

function loadExampleData() {
  var exampleUserData = [
    {
      id: 1,
      type: "owner",
      username: "owner",
      password: "pass",
      firstName: "John",
      lastName: "Owner",
      email: "pQWp6@example.com",
      phone: "1234567890"
    },
    {
      id: 2,
      type: "renter",
      username: "renter",
      password: "pass",
      firstName: "Jane",
      lastName: "Renter",
      email: "hds892h@example.com",
      phone: "5555555555"
    }]
  var exampleListingsData = [{ propertyName: "House", address: "123 Main St", capacity: 4, description: "A beautiful house", squareFt: 1000, price: 100, parkingGarage: true, publicTransit: false, smoking: false, rating: 0, ratingCount: 0 }, { propertyName: "Apartment", address: "456 Main St", capacity: 2, description: "A beautiful apartment", squareFt: 500, price: 50, parkingGarage: false, publicTransit: true, smoking: false, rating: 15, ratingCount: 3 }, { propertyName: "Office", address: "789 Main St", capacity: 10, description: "A beautiful office", squareFt: 2000, price: 200, parkingGarage: true, publicTransit: true, smoking: true, rating: 3, ratingCount: 1 },
  {
    propertyName: "Cottage",
    address: "987 Main St",
    capacity: 3,
    description: "A beautiful cottage",
    squareFt: 1200,
    price: 150,
    parkingGarage: false,
    publicTransit: false,
    smoking: false,
    rating: 0,
    ratingCount: 0
  },
  {
    propertyName: "Cabin",
    address: "654 Main St",
    capacity: 5,
    description: "A beautiful cabin",
    squareFt: 1500,
    price: 250,
    parkingGarage: true,
    publicTransit: true,
    smoking: true,
    rating: 0,
    ratingCount: 0
  },
  {
    propertyName: "Villa",
    address: "321 Main St",
    capacity: 7,
    description: "A beautiful villa",
    squareFt: 3000,
    price: 300,
    parkingGarage: true,
    publicTransit: true,
    smoking: true,
    rating: 0,
    ratingCount: 0
  },
  {
    propertyName: "Chalet",
    address: "123 Main St",
    capacity: 8,
    description: "A beautiful chalet",
    squareFt: 4000,
    price: 400,
    parkingGarage: true,
    publicTransit: true,
    smoking: true,
    rating: 0,
    ratingCount: 0
  },
  {
    propertyName: "Cottage",
    address: "123 Main St",
    capacity: 3,
    description: "A beautiful cottage",
    squareFt: 1200,
    price: 150,
    parkingGarage: false,
    publicTransit: false,
    smoking: false,
    rating: 0,
    ratingCount: 0
  }]

  localStorage.setItem("userData", JSON.stringify(exampleUserData))
  localStorage.setItem("properties", JSON.stringify(exampleListingsData))

  $("#username").val(exampleUserData[0].username)
  $("#password").val(exampleUserData[0].password)
  $("#signInStatus").html("Example data loaded")
}
