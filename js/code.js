const { json } = require("react-router-dom");

//const { json } = require("react-router-dom");
const urlBase = "" // add later
const extension= 'php'; 

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

    //var hash= md5(password);

    document.getElementById("loginResult").innerHTML= "";
    let tmp= {login:login, password:password};

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

function doSignup(){
    firstName= document.getElementById("firstN").value;
    lastName= document.getElementById("lastN").value;
    userId= document.getElementById("makeUser").value;
    password= document.getElementById("makePass").value;

    if(!firstName || !lastName|| !userId ||!password){
        document.getElementById("signupResult").innerHTML= "All fields are required.";
        return;
    }

    let tmp= {firstName: firstName,
        lastName: lastName,
        userId: userId,
        password: password};

        
    let jsonPayload= JSON.stringify(tmp); 
    let url=urlBase +'/Signup.'+ extension;

    let xhr= new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");

    try{
        xhr.onreadystatechange = function(){
            if(this.status==409){
                document.getElementById("signupResult").innerHTML= "Username already taken"
                return;
            }
            if(this.readyState === 4 && this.status=== 200){
                let jsonObject = JSON.parse(xhr.responseText);
                userId=jsonObject.id;
                firstName=jsonObject.firstName;
                lastName= jsonObject.lastName;
                document.getElementById("signupResult").innerHTML= "Signup successful! Please log in.";
                saveCookies();
            }
        };

        xhr.send(jsonPayload);
    }catch(err){
        document.getElementById("signupResult").innerHTML= err.message;
    }

}



function formatPhoneNumber(phone){
    phone = phone.replace(/\D/g, ''); 
    if(phone.length=== 10){
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return phone;
}

function validateEmail(email){
    const ret = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    return Boolean(ret);
}

function validatePhoneNumber(phone){
    const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

    return phoneRegex.test(phone);
}



function addContact(){

    let newFirstName= document.getElementById("contactFirst").value;
    let newLastName= document.getElementById("contactLast").value;
    let newEmail=document.getElementById('contactEmail').value;
    let newPhone= document.getElementById('contactNumber').value;

    let emailError= document.getElementById('emailError');
    let phoneError= document.getElementById('phoneError');
    let formError= document.getElementById('formError');

    emailError.textContent = "";
    phoneError.textContent = "";
    formError.textContent = "";

    let isValid = true;

    if(!newFirstName || !newLastName || !newEmail || !newPhone){
        formError.textContent = "Fill in all fields.";
        isValid = false;
    }

    if(!validateEmail(newEmail)){
        emailError.textContent = "Invalid email address.";
        isValid = false;
    }
    if(!validatePhoneNumber(newPhone)){
        phoneError.textContent = "Invalid phone number.";
        isValid = false;
    }

    if(!isValid){
        return;
    }

    let tmp={
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        phone: newPhone
    };

    let jsonPayload= JSON.stringify(tmp);
    let url=urlBase +'/AddContacts.'+ extension;

    let xhr= new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");

    try{
        xhr.onreadystatechange= function(){
            if(this.readyState === 4 && this.status=== 200){
                document.getElementById('addMe').reset();
                loadContact();
            }
        };
        xhr.send(jsonPayload);
    }catch(err){
        document.getElementById().innerHTML=err.message;
    }

    document.getElementById('contact-form').style.display = 'none';

    emailError.textContent= "";
    phoneError.textContent= "";
    formError.textContent= "";
}


function loadContact(){

}

function doLogout(){
    userId= 0;
    firstName= "";
    lastName= "";
    document.cookie= "firstName= ; expires= Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href= "index.html"; 
}

function deleteContact(){
    if(confirm('Are you sure you want to delete this contact?')){
        contactCard.remove();
    }
}

function editContact(editButton) {
    editButton.style.display = "none";
    const saveButton = editButton.parentNode.querySelector('.save-btn');
    saveButton.style.display = "inline";
    

}


//cookies!

function saveCookies(){
    let minutes= 20;
    let date= new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie= "firstName=" + firstName + ",lastName=" +lastName+ ",userId="+ userId+ ";expires="+ date.toGMTString();
}

function readCookie(){
    userId= -1;
    let data= document.cookie;
    let splits= data.split("=");
    for(var i=0; i<splits.length; i++){
        let thisOne= splits[i].trim();
        let tokens= thisOne.split("=");

        if(tokens[0]== "firstName"){
            firstName= tokens[1];
        }else if(tokens[0]== "lastName"){
            lastName=tokens[1];
        }else if(tokens[0]=='userId'){
            userId= parseInt(tokens[1].trim());
        }
    }

    if(userId<0){
        window.location.href= "index.html";
    }else{
        document.getElementById("userName").innerHTML= "Logged in as" +firstName+ " "+lastName;
    }
}