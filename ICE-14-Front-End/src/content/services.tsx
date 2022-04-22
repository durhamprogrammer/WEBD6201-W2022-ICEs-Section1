import React, {useEffect}  from 'react';

function Services() 
{
    useEffect(()=>{
        document.title = "Our Services";
    });

    return (
        <div>
            <h1>Our Services</h1>
            <hr />
            <p>Here is detail about our services</p>
            
        </div>
    );
}

export default Services;