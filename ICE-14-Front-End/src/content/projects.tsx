import React, { useEffect }  from 'react';

function Projects()
{
    useEffect(()=>{
        document.title = "Our Services";
    });

    return (
        <div>
            <h1>Our Projects</h1>
            <hr />
            <p>Here is detail about our projects</p>
            
        </div>
    );

}

export default Projects;