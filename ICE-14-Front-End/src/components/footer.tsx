import React  from 'react';

function Footer()
{
    
    function getDate(): number
    {
        let date = new Date();
        return date.getFullYear();
    }

    return(
        <nav className="navbar fixed-bottom navbar-light bg-light">
            <div className="container-fluid">
                <h3>&copy; Copyright {getDate()}</h3>
            </div>
        </nav>
    );
}

export default Footer;