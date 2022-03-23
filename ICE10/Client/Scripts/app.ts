// IIFE -- Immediately Invoked Function Express
// AKA anonymous self-executing function

"use strict";
(function()
{
    function AuthGuard(): void
    {
        let protected_routes = [
            "contact-list"
        ];
    
        if(protected_routes.indexOf(router.ActiveLink) > -1)
        {
            // check if user is logged in
            if(!sessionStorage.getItem("user"))
            {
                // if not...change the active link to "login"
                router.ActiveLink = "login";
            }
        }
    }

    function LoadLink(link: string, data: string = ""): void
    {
        router.ActiveLink = link;

        AuthGuard();

        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);

        //Capitalize the router activeLink and set the title to it
        document.title = router.ActiveLink.substring(0, 1).toUpperCase() +
        router.ActiveLink.substring(1);

        // remove all active links
        $("ul>li>a").each(function()
        {
            $(this).removeClass("active");
        });

        $(`li>a:contains(${document.title})`).addClass("active");

        LoadContent();
    }

    function AddNavigationEvents(): void
    {
        let navLinks = $("ul>li>a"); // find all navigation links

        // remove navigation events
        navLinks.off("click");
        navLinks.off("mouseover");

        // loop through each navigation link and load appropriate content on click
        navLinks.on("click", function()
        {
            LoadLink($(this).attr("data") as string);
        });

        // make the navigation links look like they are clickable
        navLinks.on("mouseover", function()
        {
            $(this).css("cursor", "pointer");
        });
    }

    function AddLinkEvents(link: string): void
    {
        let linkQuery = $(`a.link[data=${link}]`);

        // remove all link events
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");

        // add css to adjust the link aesthetic
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");

        // add link events
        linkQuery.on("click", function()
        {
            LoadLink(`${link}`);
        });

        linkQuery.on("mouseover", function()
        {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });

        linkQuery.on("mouseout", function()
        {
            $(this).css("font-weight", "normal");
        });
    }


    /**
     * This function loads the Navbar from the header file and injects into the page
     *
     */
    function LoadHeader(): void
    {
        $.get("./Views/components/header.html", function(html_data)
        {
            $("header").html(html_data);

            AddNavigationEvents();
            
            CheckLogin();
        });
        
    }

    /**
     *
     *
     * @returns {void}
     */
    function LoadContent(): void
    {
        let page_name: string = router.ActiveLink; //alias
        let callback: Function = ActiveLinkCallBack();
        $.get(`./Views/content/${page_name}.html`, function(html_data)
        {
            $("main").html(html_data);

            CheckLogin();

            callback();
        });
    }

    function LoadFooter(): void
    {
        $.get("./Views/components/footer.html", function(html_data)
        {
            $("footer").html(html_data);
        });
    }

    function DisplayHome(): void
    {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () => 
        {
            LoadLink("about");
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);

        $("main").append(`
        <article>
            <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
            </article>`);
    }

    function DisplayAboutPage(): void
    {
        console.log("About Us Page");
    }

    function DisplayProjectsPage(): void
    {
        console.log("Our Projects Page");
    }

    function DisplayServicesPage(): void
    {
        console.log("Our Services Page");
    }

    /**
     * Adds a Contact Object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName: string, contactNumber: string, emailAddress: string)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();
                
            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This method validates an input text field in the form and displays
     * an error in the message area
     *
     * @param {string} input_field_ID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(input_field_ID: string, regular_expression: RegExp, error_message: string)
    {
        let messageArea = $("#messageArea").hide();
        
        $("#" + input_field_ID).on("blur", function()
        {
            let inputFieldText: string = $(this).val() as string;

            if(!regular_expression.test(inputFieldText))
            {
                $(this).trigger("focus").trigger("select"); 
                messageArea.addClass("alert alert-danger").text(error_message).show(); 
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*$/,"Please enter a valid Full Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Please enter a valid Contact Number.");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function()
        {
            LoadLink("contact-list");
        });

        ContactFormValidation();
        
        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function()
        {
            if(subscribeCheckbox.checked)
            { 
                let fullName = document.forms[0].fullName.value as string;
                let contactNumber = document.forms[0].contactNumber.value as string;
                let emailAddress = document.forms[0].emailAddress.value as string;

                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact-List Page");

        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList") as HTMLElement;

            let data = ""; // data container -> add deserialized data from the localStorage

            let keys = Object.keys(localStorage); // returns a string array of keys

            let index = 1; // counts how many keys

            // for every key in the keys array (collection), loop
            for (const key of keys) 
            {
                let contactData = localStorage.getItem(key); // get localStorage data value related to the key

                let contact = new core.Contact(); // create a new empty contact object
                contact.deserialize(contactData as string);

                // inject a repeatable row into the contactList
                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;

                index++;
            }

            contactList.innerHTML = data;

            $("button.delete").on("click", function()
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val() as string);
                }

                // refresh after deleting
                LoadLink("contact-list");
            });

            $("button.edit").on("click", function()
            {
                LoadLink("edit", $(this).val() as string)
            });
        }

        $("#addButton").on("click",() =>
        {
            LoadLink("edit", "add");
        });
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = router.LinkData;

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
                
                    $("#editButton").on("click", (event)=>
                    {
                        event.preventDefault();

                        let fullName = document.forms[0].fullName.value as string;
                        let contactNumber = document.forms[0].contactNumber.value as string;
                        let emailAddress = document.forms[0].emailAddress.value as string;

                        // Add Contact
                        AddContact(fullName, contactNumber, emailAddress);

                        // refresh the contact-list page
                        LoadLink("contact-list");
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        LoadLink("contact-list");
                    });
                }
                break;
            default:
                {
                    // get the contact  info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page) as string);

                    // display the contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    // when editButton is pressed - update the contact
                    $("#editButton").on("click", (event)=>
                    {
                        event.preventDefault();

                        // get any changes from the form
                        contact.FullName = $("#fullName").val() as string;
                        contact.ContactNumber = $("#contactNumber").val() as string;
                        contact.EmailAddress = $("#emailAddress").val() as string;

                        // replace the item in localStorage
                        localStorage.setItem(page, contact.serialize());

                        // return to the contact-list
                        LoadLink("contact-list");
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        LoadLink("contact-list");
                    });
                }
                break;
        }
    }

    function CheckLogin()
    {
        // if user is logged in, then...
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link for logout
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            );

            $("#logout").on("click", function()
            {
                // perform logout
                sessionStorage.clear();

                // swap out the logout link for login
                $("#login").html(
                    `<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`
                );

                AddNavigationEvents();
                
                // redirect back to login page
                LoadLink("login");
            });
        }
    }

    function DisplayLoginPage()
    {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();

        AddLinkEvents("register");

        $("#loginButton").on("click", function()
        {
            let success = false;

            // create an empty user object
            let newUser = new core.User();

            let username = document.forms[0].username.value as string;
            let password = document.forms[0].password.value as string;

            // use jQuery shortcut to lod the users.json file
            $.get("./Data/users.json", function(data)
            {
                // for every user in the users.json file, loop
                for (const user of data.users) 
                {
                    // check if the username and password entered matches the user data
                    if(username == user.Username && password == user.Password)
                    {
                        console.log("conditional passed!");
                        // get the user data from the file and assign it to our empty user object
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                 // if username and password matches..success! -> perform the login sequence
                if(success)
                {
                    // add user to session storage
                    sessionStorage.setItem("user", newUser.serialize() as string);

                    // hide any error message
                    messageArea.removeAttr("class").hide();

                    // redirect the user to the secure area of the site - contact-list.html
                    LoadLink("contact-list");
                }
                else
                {
                    // display an error message
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
                }
            });
        });

        $("#cancelButton").on("click", function()
        {
            // clear the login form
            document.forms[0].reset();

            // return to the home page
            LoadLink("home");
        });
    }

    function DisplayRegisterPage()
    {
        console.log("Register Page");

        AddLinkEvents("login");
    }

    function Display404()
    {

    }

    /**
     * This function returns the appropriate callback function relative to the activeLink
     *
     * @returns {Function}
     */
    function ActiveLinkCallBack() : Function
    {
        switch (router.ActiveLink) 
        {
          case "home": return DisplayHome;
          case "about": return DisplayAboutPage;
          case "projects": return DisplayProjectsPage;
          case "services": return DisplayServicesPage;
          case "contact-list": return DisplayContactListPage;
          case "contact": return DisplayContactPage;
          case "edit": return DisplayEditPage;
          case "login": return DisplayLoginPage;
          case "register": return DisplayRegisterPage;
          case "404": return Display404;
          default:
              console.error("ERROR: callback does not exist: " + router.ActiveLink);
              return new Function();
        }
    }

    // named function
    function Start()
    {
        console.log("App Started!!");

        LoadHeader();

        LoadLink("home");

        LoadFooter();
    }
    
    window.addEventListener("load", Start);

})();