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
  // var userData = JSON.parse(localStorage.getItem("userData"))

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

  $.ajax({
    url: `${window.backendURL}/signup`,
    type: "POST",
    data: {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      type: type
    },
    success: (res) => {
      console.log(res)

      postAuthenticate(res.user, res.accessToken)


    },
    error: (error) => {
      console.log(error)
    }
  })

  // //add to array
  // userData.push({
  //   "id": userData.length + 1,
  //   "type": type,
  //   "username": username,
  //   "password": password,
  //   "firstName": firstName,
  //   "lastName": lastName,
  //   "email": email,
  //   "phone": phone
  // })

  //set local storage
  // localStorage.setItem("userData", JSON.stringify(userData))
}

function signIn() {
  // var userData = JSON.parse(localStorage.getItem("userData"))

  var username = $("#username").val()
  var password = $("#password").val()

  $.ajax({
    url: `${window.backendURL}/login`,
    method: "POST",
    data: {
      username: username,
      password: password
    },
    success: (res) => {
      console.log(res)

      postAuthenticate(res.user, res.accessToken)
    },
    error: (err) => {
      console.log(err)

      $("#signInStatus").html("Login failed")
    }
  })
}

function signOut() {
  localStorage.setItem("signedIn", "false")
  window.location.href = "LoginPage.html"
}

//common functionality after login/signup
function postAuthenticate(user, token) {
  $("#signInStatus").html("Login successful")
  localStorage.setItem("signedIn", "true")

  localStorage.setItem("type", user.type)
  localStorage.setItem("name", `${user.firstName} ${user.lastName}`)

  localStorage.setItem("username", username)

  localStorage.setItem("userID", user.id)

  localStorage.setItem("token", token)

  switch (user.type) {
    case "renter":
      window.location.href = "PropertyBrowser.html"
      break
    case "owner":
      window.location.href = "ManageListings.html"
      break
  }
}

// function getUserInfo(id, token) {
//   $.ajax({
//     url: `${window.backendURL}/users/${id}`,
//     method: "GET",
//     beforeSend: (xhr) => {
//       xhr.setRequestHeader("Authorization", `Bearer ${token}`)
//     },
//     success: (res) => {
//       return res
//     },
//     error: (err) => {
//       return err
//     }
//   })
// }

function loadExampleData() {

  // localStorage.setItem("userData", JSON.stringify(exampleUserData))
  // localStorage.setItem("properties", JSON.stringify(exampleListingsData))

  $.ajax({
    url: `${window.backendURL}/populateExampleData`,
    method: "POST",
    success: (res) => {
      console.log(res)
    },
    error: (err) => {
      console.log(err)
    }
  })

  $("#signInStatus").html("Example data loaded")
}


