$(() => {
    var userData = []

    $("#signUp").submit((event) => {
        event.preventDefault()

        firstName = $("#firstName").val()
        lastName = $("#lastName").val()
        email = $("#email").val()
        phone = $("#phone").val()
        password = $("#newPassword").val()

        userData.push({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "password": password,
        })

        localStorage.setItem("firstName", firstName)
        localStorage.setItem("lastName", lastName)
        localStorage.setItem("email", email)
        localStorage.setItem("phone", phone)

        window.location.href = "/html/Main.html"
    })
})

