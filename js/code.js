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

    const firstName= document.getElementById('contactFirst').value;
    const lastName= document.getElementById('contactLast').value;
    const email= document.getElementById('contactEmail').value;
    const phone= document.getElementById('contactNumber').value;

    const emailError= document.getElementById('emailError');
    const phoneError= document.getElementById('phoneError');
    const formError= document.getElementById('formError');

    emailError.textContent = "";
    phoneError.textContent = "";
    formError.textContent = "";

    let isValid = true;

    if(!firstName || !lastName || !email || !phone){
        formError.textContent = "Fill in all fields.";
        isValid = false;
    }

    if(!validateEmail(email)){
        emailError.textContent = "Invalid email address.";
        isValid = false;
    }
    if(!validatePhoneNumber(phone)){
        phoneError.textContent = "Invalid phone number.";
        isValid = false;
    }

    if(!isValid){
        return;
    }

    const contactCard=document.createElement('div');
    contactCard.classList.add('addcontacts');

    const pfpDiv= document.createElement('div');
    pfpDiv.classList.add('pfp');
    const pfpImg= document.createElement('img');
    pfpImg.classList.add('pfpimg');
    pfpImg.src ='images/pfp.png';
    pfpImg.alt= 'Profile Picture';

    const initialsDiv= document.createElement('div');
    initialsDiv.classList.add('initial');
    initialsDiv.textContent= `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;

    pfpDiv.appendChild(pfpImg);
    pfpDiv.appendChild(initialsDiv);

    const contactDetails= document.createElement('div');

    const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    contactDetails.innerHTML= `
        <h3>${formattedFirstName} ${formattedLastName}</h3>
        <p>${email}</p>
        <p>${formatPhoneNumber(phone)}</p>
    `;

    contactCard.appendChild(pfpDiv);
    contactCard.appendChild(contactDetails);

    document.querySelector('.contacts-grid').appendChild(contactCard);

    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('addMe').reset();

    emailError.textContent = "";
    phoneError.textContent = "";
    formError.textContent = "";

}

function doLogout(){
    userId= 0;
    firstName= "";
    lastName= "";
    document.cookie= "firstName= ; expires= Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href= "index.html"; 
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