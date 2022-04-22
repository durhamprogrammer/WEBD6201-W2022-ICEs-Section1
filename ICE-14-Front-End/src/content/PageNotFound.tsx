import React, { useEffect } from 'react';

function PageNotFound()
{
    useEffect(()=>{
        document.title = "ERROR: 404";
    });
    return(
        <div>
            <h1>ERROR: 404 - Page not found!</h1>
        </div>
    );    
}

export default PageNotFound;