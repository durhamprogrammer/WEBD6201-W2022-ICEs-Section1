// IIFE -- Immediately Invoked Function Express
// AKA anonymous self-executing function

"use strict";
(function()
{
    function DisplayHome()
    {
        console.log("Home Page");

        $("#AboutUsButton").on("click", () => 
        {
            location.href = "about.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);

        $("body").append(`
        <article class="container">
            <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
            </article>`);

    }

    function DisplayAboutPage()
    {
        console.log("About Us Page");
    }

    function DisplayProjectsPage()
    {
        console.log("Our Projects Page");
    }

    function DisplayServicesPage()
    {
        console.log("Our Services Page");
    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function()
        {
            if(subscribeCheckbox.checked)
            { 
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();

                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact-List Page");
        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = ""; // data container -> add deserialized data from the localStorage

            let keys = Object.keys(localStorage); // returns a string array of keys

            let index = 1; // counts how many keys

            // for every key in the keys array (collection), loop
            for (const key of keys) 
            {
                let contactData = localStorage.getItem(key); // get localStorage data value related to the key

                let contact = new Contact(); // create a new empty contact object
                contact.deserialize(contactData);

                // inject a repeatable row into the contactList
                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;

                


                index++;
            }

            contactList.innerHTML = data;
        }
    }


    // named function
    function Start()
    {
        console.log("App Started!!");

        switch (document.title) {
          case "Home":
            DisplayHome();
            break;
          case "About Us":
            DisplayAboutPage();
            break;
          case "Our Projects":
            DisplayProjectsPage();
            break;
          case "Our Services":
            DisplayServicesPage();
            break;
          case "Contact-List":
            DisplayContactListPage();
            break;
          case "Contact Us":
            DisplayContactPage();
            break;
        }
    }
    

    window.addEventListener("load", Start);


})();