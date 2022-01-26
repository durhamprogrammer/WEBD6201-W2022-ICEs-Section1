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
        let DocumentBody = document.body;
        
        // Step 2 - Create a HTML Element in memory
        let MainParagraph = document.createElement("p");
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>`;

        // Step 3 - Configure new Element
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        let FirstString = "This is";
        let SecondString = `${FirstString} the Main Paragraph`;
        MainParagraph.textContent = SecondString;
        Article.setAttribute("class", "container");


        // Step 4 - perform insertion / deletion

        // example of insert after (append)
        MainContent.appendChild(MainParagraph);
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);


        // example of insert before
        //MainContent.before(MainParagraph);

        // example of deletion
        //document.getElementById("AboutUsButton").remove();
        //AboutUsButton.remove();

        // ES6 and HTLM5 => Template Strings => "Super Strings"
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