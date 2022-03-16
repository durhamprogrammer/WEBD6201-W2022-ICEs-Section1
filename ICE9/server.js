const hello = require('./hello');
const getUsersData = require('./users.data');

hello();

getUsersData()
.then(function(data) 
{
    console.log(data);
})
.catch(function(err)
{
    console.error("Error: Data has not been returned");
});
