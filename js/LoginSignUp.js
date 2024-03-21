$(() => {
    var userData = JSON.parse(localStorage.getItem("userData"))

    //on signup
    $("#signUp").submit((event) => {
        event.preventDefault()

        firstName = $("#firstName").val()
        lastName = $("#lastName").val()
        email = $("#email").val()
        phone = $("#phone").val()
        password = $("#newPassword").val()

        //check if user already exists
        if (checkIfUserExists(email)) {
            return
        }

        //add to array
        userData.push({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "password": password,
        })

        //set local storage
        localStorage.setItem("userData", JSON.stringify(userData))

        //go to main page
        window.location.href = "/html/Main.html"
    })
})

function checkIfUserExists(email) {
    var userData = JSON.parse(localStorage.getItem("userData"))
    if (userData.some((user) => user.email == email)) {
        $("#signUpStatus").html("User already exists")
        return true
    }   
    return false
}

