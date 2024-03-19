$(() => {
    $("#welcome").html(`Welcome, ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`)
    
})