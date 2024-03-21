$(() => {
    //set welcome text
    $("#welcome").html(`Welcome, ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`)
    
})