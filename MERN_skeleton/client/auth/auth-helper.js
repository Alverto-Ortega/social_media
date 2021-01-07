//helper methods to store and retrieve JWT credentials from client side 
//using sessionStorage, also clearing out the sessionstorage on user-signout
//localStorage can be used also but the user auth state will be rememebered across tabs in a browser 
//sessionStorage remember only in current window tab

const { SingleBedOutlined } = require("@material-ui/icons");

const auth = {
    authenticate(jwt, cb){
        if(typeof window !== "undefined")
            sessionStorage.setItem('jwt', JSON.stringify(jwt));
        
        cb();
    },

    isAuthenticated(){
        if (typeof window == "undefined"){
            return false;
        }
        if (sessionStorage.getItem('jwt')){
            return JSON.parse(sessionStorage.getItem('jwt'));
        }else{
            return false;
        }
    },

    //deleting credentials from storage when user signs out
    clearJWT(cb){
        if(typeof window !== "undefined"){
            sessionStorage.removeItem('jwt');
        }
        cb();
        //optional for cookies used 
        signout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
    }
};

export default auth;