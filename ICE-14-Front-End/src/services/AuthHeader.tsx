export default function AuthHeader() 
{
    const userStr = localStorage.getItem("user");
    let user = null;

    if (userStr)
    {
      user = JSON.parse(userStr);
    }
      
    if (user && user.token) 
    {
      return {headers: { "Authorization": "Bearer " + user.token }};
    } 
    else 
    {
      return {};
    }
}