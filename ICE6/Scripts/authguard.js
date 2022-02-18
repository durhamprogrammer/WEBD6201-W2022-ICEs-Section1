"use strict";
(function()
{
    // check if user is logged in
    if(!sessionStorage.getItem("user"))
    {
        // redirect to login page
        location.href = "login.html";
    }
})();