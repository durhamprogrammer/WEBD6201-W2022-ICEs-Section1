// IIFE -- Immediately Invoked Function Express
// AKA anonymous self-executing function
(function()
{
    function DisplayHome()
    {
        let AboutUsButton = document.getElementById("AboutUsButton");
        AboutUsButton.addEventListener("click", function()
        {
            location.href = "about.html";
        });

        // Step 1 - get a reference to an entry point(s) (insertion / deletion point)
        let MainContent = document.getElementsByTagName("main")[0];
        
        // Step 2 - Create a HTML Element in memory
        let MainParagraph = document.createElement("p");

        // Step 3 - Configure new Element
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is the Main Paragraph!";

        // Step 4 - perform insertion / deletion
        MainContent.appendChild(MainParagraph);
    }


    // named function
    function Start()
    {
        console.log("App Started!!");

        switch(document.title)
        {
            case "Home":
                DisplayHome();
                break;
        }
        
    }
    

    window.addEventListener("load", Start);


})();