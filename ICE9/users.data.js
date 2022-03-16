const fs = require('fs');
const fsPromises = fs.promises;

module.exports = async function()
{   
        // read the users data file

        return await fsPromises.readFile('./Data/users.json', "utf8", function(err, data)
        {
            if(err)
            {
                console.error(err.message);
            }
            userData = data;
        });        
}
    

