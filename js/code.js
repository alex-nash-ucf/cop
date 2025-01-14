const { json } = require("react-router-dom");

urlBase = "" // add later

let userId= 0;
let firstName= "";
let lastName= "";

function doLogin()
{
    //testing 
    //alert("Login pressed");
    //document.getElementById("loginResult").innerHTML = "Login pressed";


    userId= 0;
    firstName= "";
    lastName= "";

    let login= document.getElementById("loginName").value;
    let password= document.getElementById("loginPassword").value;

    var hash= md5(password);

    document.getElementById("loginResult").innerHTML= "";
    let tmp= {login:login, password:hash};

    let jsonPayload= JSON.stringify(tmp); 
    let url=urlBase +'/Login.'+ extension;

    let xhr= new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");

    try{
        xhr.onreadystatechange= function(){
            if(this.readyState== 4 && this.status==200){
                let jsonObject= JSON.parse(xhr.responseText);
                userId=jsonObject.id;

                if(userId <1){
                    document.getElementById("loginResult").innerHTML = "User / Password combination is incorrect";
                    return;
                }
                firstName= jsonObject.firstName;
                lastName= jsonObject.lastName;

                saveCookie();
                window.location=href="loggedIn.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){
        document.getElementById("loginResult").innerHTML= err.message;

    }


}


function doLogout(){
    userId= 0;
    firstName= "";
    lastName= "";
    document.cookie= "firstName= ; expires= Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href= "index.html"; 
}