const urlBase = 'http://pokebook.online/LAMPAPI'
const extension= 'php'; 

let userId= 0;
let firstName= "";
let lastName= "";

function doLogin()
{

    //testing 
    //alert("Login pressed");
    //document.getElementById("loginResult").innerHTML = "Login pressed";
    console.log("login clicked");

    userId= 0;
    firstName= "";
    lastName= "";

    let login= document.getElementById("loginUser").value;
    let password= document.getElementById("loginPass").value;

    console.log(login);    
    console.log(password);    

    var hash= md5(password);
    console.log(hash);    


    document.getElementById("loginResult").innerHTML= "";

    if(!login ||!password){
        document.getElementById("loginResult").innerHTML= "All fields are required.";
        return;
    }

    let tmp= {login:login, password:password};

    let jsonPayload= JSON.stringify(tmp); 
    let url=urlBase +'/Login.'+ extension;

    let xhr= new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");

    try{
        xhr.onreadystatechange= function(){
            if(this.readyState== 4 && this.status==200){
                console.log(xhr.responseText); //log response
                let jsonObject= JSON.parse(xhr.responseText);
    
                userId=jsonObject.id;
                console.log("user"+userId);

                if(userId <1){
                    document.getElementById("loginResult").innerHTML = "User / Password combination is incorrect";
                    return;
                }
                firstName= jsonObject.firstName;
                lastName= jsonObject.lastName;
                console.log("first"+firstName);

                console.log("last"+lastName);


                saveCookie();
                console.log("Login successful with userId:", userId);
                window.location.href = "loggedIn.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){
        console.error(err);
        console.log("error");
        document.getElementById("loginResult").innerHTML= err.message;

    }

}

function doSignup(){
    console.log("signup clicked");
    
    let firstName= document.getElementById("firstN").value;
    let lastName= document.getElementById("lastN").value;
    let username= document.getElementById("makeUser").value;
    let password= document.getElementById("makePass").value;
    
    console.log(firstName);    
    console.log(lastName);    
    console.log(username);    
    console.log(password);    

    if(!firstName || !lastName|| !username ||!password){
        document.getElementById("signupResult").innerHTML= "All fields are required.";
        return;
    }

    let tmp= {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
    };
    

    let jsonPayload= JSON.stringify(tmp); 

    let url=urlBase +'/AddUser.'+ extension;

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
                console.log("signed up!");
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


function validatePass(password){
    
    const myInput = document.getElementById("makePass");
    const length = document.getElementById("length");
    const symbol = document.getElementById("symbol");
    const passNum = document.getElementById("passNum");
    const capital = document.getElementById("capital");

    //special characters
    const specialCharacters= /[!@#$%^&*(),.?":{}|<>]/g;
    if(password.match(specialCharacters)){
        symbol.classList.remove("invalid");
        symbol.classList.add("valid");
    }else{
        symbol.classList.remove("valid");
        symbol.classList.add("invalid");
    }

    //uppercase
    const upperCaseLetters= /[A-Z]/g;
    if(password.match(upperCaseLetters)){
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    }else{
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    //numbers
    const numbers = /[0-9]/g;
    if(password.match(numbers)){
        passNum.classList.remove("invalid");
        passNum.classList.add("valid");
    }else{
        passNum.classList.remove("valid");
        passNum.classList.add("invalid");
    }

    if(password.length>=8){
        length.classList.remove("invalid");
        length.classList.add("valid");
    }else{
        length.classList.remove("valid");
        length.classList.add("invalid");
    }

      
}

function showPasswordRequirements(){
    document.getElementById('passwordReq').style.display= 'block';
}

function hidePasswordRequirements(){
    document.getElementById('passwordReq').style.display= 'none';
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


//cookies!

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
    //let expires = "expires=" + date.toGMTString();

    console.log("cookie userId: " + userId);
    console.log("cookie first: " + firstName);
    console.log("cookie last: " + lastName);

	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
    console.log("Saved Cookie: " + document.cookie);

}

function readCookie()
{
    console.log("before read cookie userid"+userId);

	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
        console.log("after read cookie userid"+userId);
	}
    loadContact();
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}


function addContact(){

    console.log("add contact clicked");

    //test
   //readCookie();

    let newFirstName= document.getElementById("contactFirst").value;
    let newLastName= document.getElementById("contactLast").value;
    let newEmail=document.getElementById('contactEmail').value;
    let phoneNumber= document.getElementById('contactNumber').value;

    let emailError= document.getElementById('emailError');
    let phoneError= document.getElementById('phoneError');
    let formError= document.getElementById('formError');

    console.log("First Name:", newFirstName);
    console.log("Last Name:", newLastName);
    console.log("Email:", newEmail);
    console.log("Phone:", phoneNumber);
    console.log("User ID:", userId);


    emailError.textContent = "";
    phoneError.textContent = "";
    formError.textContent = "";

    let isValid = true;

    if(!newFirstName || !newLastName || !newEmail || !phoneNumber){
        formError.textContent = "Fill in all fields.";
        isValid = false;
        return;
    }

    if(!validateEmail(newEmail)){
        emailError.textContent = "Invalid email address.";
        isValid = false;
        return;
    }
    if(!validatePhoneNumber(phoneNumber)){
        phoneError.textContent = "Invalid phone number.";
        isValid = false;
        return;
    }

    if(!isValid){
        return;
    }

    let tmp={
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        phoneNumber: phoneNumber,
        userId: userId
    };

    let jsonPayload= JSON.stringify(tmp);
    let url=urlBase +'/AddContacts.'+ extension;

    let xhr= new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");

    try{
        xhr.onreadystatechange= function(){
            if(this.readyState === 4 && this.status=== 200){
                console.log("added contact");    

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

    console.log("loading contact");
    let tmp= {
        search: "",
        userId:userId
    };
    let jsonPayload= JSON.stringify(tmp);

    let url=urlBase +'/SearchContacts.'+ extension;
    let xhr= new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");

    try{
        xhr.onreadystatechange= function(){
            if(this.readyState === 4 && this.status=== 200){
                let jsonObject= JSON.parse(xhr.responseText);
                let contactsGrid= document.querySelector(".contacts-grid");
                contactsGrid.innerHTML= "";

                if(!jsonObject.results || jsonObject.results.length === 0){
                    console.log("No contacts found");
                    return;
                }

                //alphabetical
                jsonObject.results.sort((a, b)=>{
                    let fullNameA = (a.FirstName + " " + a.LastName).toLowerCase();
                    let fullNameB = (b.FirstName + " " + b.LastName).toLowerCase();
                    return fullNameA.localeCompare(fullNameB);
                });


                for(let i=0;i<jsonObject.results.length;i++){
                    let email = jsonObject.results[i].Email;
                    let firstName = jsonObject.results[i].FirstName;
                    let lastName = jsonObject.results[i].LastName;
                    let phone = jsonObject.results[i].Phone;
                    let id= jsonObject.results[i].ID;

                    console.log(`  Name: ${firstName} ${lastName}`);
                    console.log(`  Email: ${email}`);
                    console.log(`  Phone: ${phone}`);
                    console.log(`  id: ${id}`);
                    console.log("-----------");
                    
                    if (!jsonObject.results || jsonObject.results.length === 0){
                        contactsGrid.innerHTML = "<p>No contacts found.</p>";
                        return;
                    }

                    //contact card
                    const contactCard= document.createElement('div');
                    contactCard.classList.add('addcontacts');

                    //pfp
                    const pfpDiv= document.createElement('div');
                    pfpDiv.classList.add('pfp');
                    const pfpImg= document.createElement('img');
                    pfpImg.classList.add('pfpimg');
                    pfpImg.src= 'images/pfp.png';
                    pfpImg.alt= 'Profile Picture';

                    const initialsDiv= document.createElement('div');
                    initialsDiv.classList.add('initial');
                    initialsDiv.textContent= `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;

                    pfpDiv.appendChild(pfpImg);
                    pfpDiv.appendChild(initialsDiv);

                    //info
                    const contactDetails= document.createElement('div');
                    contactDetails.classList.add('contact-details');

                    const formattedFirstName= firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
                    const formattedLastName= lastName.charAt(0).toUpperCase() +lastName.slice(1).toLowerCase();

                    contactDetails.innerHTML= `
                        <h3>${formattedFirstName} ${formattedLastName}</h3>
                        <p>${email}</p>
                        <p>${formatPhoneNumber(phone)}</p>
                    `;
                
                    //buttons
                    const buttonsDiv= document.createElement('div');
                    buttonsDiv.classList.add('buttons');

                    const editButton = document.createElement('button');
                    editButton.classList.add('edit-btn');
                    editButton.innerHTML = '<img src="images/edit.png" alt="edit" class="button-img" />'; 
                    editButton.addEventListener('click', () => editContact(contactCard, contactDetails, editButton, saveButton, deleteButton, id));
                    
                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('delete-btn');
                    deleteButton.innerHTML = '<img src="images/delete.png" alt="delete" class="button-img" />';
                    deleteButton.addEventListener('click', () => deleteContact(contactCard,firstName,lastName));

                    const saveButton = document.createElement("button");
                    saveButton.classList.add("save-btn");
                    saveButton.innerHTML = '<img src="images/save.png" alt="save" class="button-img" />';
                    saveButton.style.display = "none";
                    saveButton.addEventListener("click", () => saveEditedContact(contactCard, contactDetails, editButton, saveButton));

                    //apend
                    buttonsDiv.appendChild(saveButton);
                    buttonsDiv.appendChild(editButton);
                    buttonsDiv.appendChild(deleteButton);

                    contactCard.appendChild(pfpDiv);
                    contactCard.appendChild(contactDetails);
                    contactCard.appendChild(buttonsDiv);

                    contactsGrid.appendChild(contactCard);
                }
            }
        };

        xhr.send(jsonPayload);
    } catch (err) {
        console.error("Error loading contacts:", err.message);
    }
}


function doLogout(){
    userId= 0;
    firstName= "";
    lastName= "";
    document.cookie= "firstName= ; expires= Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href= "index.html"; 
}

function deleteContact(contactCard, firstName, lastName){
    console.log("delete contact clicked");


    const confirmation = window.confirm(`Are you sure you want to delete ${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()} ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()} from your contacts?`);

    if(confirmation){

        let tmp={
            firstName: firstName,
            lastName: lastName,
            userId: userId
        }        
    
        let jsonPayload= JSON.stringify(tmp);
    
        let url= urlBase + '/DeleteContacts.'+ extension;
    
        let xhr= new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
        try{
            xhr.onreadystatechange= function(){
                if (this.readyState == 4 && this.status == 200){
                    loadContact();
                }
    
            };
            xhr.send(jsonPayload);
    
        }catch(err){
            console.log(err.message);
        }

    }else{
        console.log("Contact deletion canceled");
    }

}

function saveContact(contactFirst1, contactLast1, contactEmail1, contactNumber1, id){
    console.log("save contact clicked");

    var updatedFirstName= document.getElementById("contactFirst1").value;
    var updatedLastName= document.getElementById("contactLast1").value;
    var updatedEmail= document.getElementById("contactEmail1").value;
    var updatedPhone= document.getElementById("contactNumber1").value;

    console.log("After Edit:");
    console.log(`  Name: ${updatedFirstName} ${updatedLastName}`);
    console.log(`  Email: ${updatedEmail}`);
    console.log(`  Phone: ${updatedPhone}`);
    console.log("ID being sent:", id);


    let tmp={
        firstName: updatedFirstName,
        lastName: updatedLastName,
        email: updatedEmail,
        phoneNumber: updatedPhone,
        ID: id
    };

    console.log("Data being sent to server:", tmp);


    let jsonPayload= JSON.stringify(tmp);

    let url= urlBase + '/UpdateContacts.'+ extension;

    let xhr= new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try{
        xhr.onreadystatechange= function(){
            if (this.readyState == 4 && this.status == 200){
                loadContact();
                console.log("Updated contact");
            }
        };
        xhr.send(jsonPayload);

    }catch(err){
        console.log(err.message);
    }

}

function cancelContact(){
    console.log("cancel contact clicked");
}

function editContact(contactCard, contactDetails, editButton, saveButton, deleteButton, id){
    console.log("edit contact clicked");

    editButton.style.display = "none";
    deleteButton.style.display = "none";
    saveButton.style.display = "none";

    const firstName = contactDetails.querySelector('h3').innerText.split(' ')[0]; 
    const lastName = contactDetails.querySelector('h3').innerText.split(' ')[1];
    const email= contactDetails.querySelector('p:nth-of-type(1)').innerText;
    const phone= contactDetails.querySelector('p:nth-of-type(2)').innerText;
    const id1= id;


    console.log("Before Edit:");
    console.log(`  Name: ${firstName} ${lastName}`);
    console.log(`  Email: ${email}`);
    console.log(`  Phone: ${phone}`);
    console.log(`  id: ${id1}`);

    const originalDetails={
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
    };

    contactDetails.innerHTML = `
        <form class="addform" id="editContactForm" action="" method="post">
            <div class="inputrow">
                <input id="contactFirst1" type="text" value="${firstName}" placeholder="First Name" required>
                <input id="contactLast1" type="text" value="${lastName}" placeholder="Last Name" required>
            </div>
            <input id="contactEmail1" type="text" value="${email}"placeholder="example@email.com" pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"required>
            <span id="emailError" class="error-message"></span>
            <input id="contactNumber1" type="text" value="${phone}" placeholder="XXX-XXX-XXXX" required pattern="^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$">
            <span id="phoneError" class="error-message"></span>
            <span id="formError" class="error-message"></span>
            <button id="saveContactbtn" type="button" class="savebut" onclick="saveContact(contactFirst1, contactLast1, contactEmail1, contactNumber1, ${id1});"> Save</button>
            <button id="cancelContactbtn" type="button" class="cancelbut" onclick="cancelContact();"> Cancel</button>
        </form>
    `;
}

function search(){
    console.log("search clicked");

    let srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
    let contactsGrid = document.querySelector(".contacts-grid");
    contactsGrid.innerHTML= "";

    if(srch=== ""){
        loadContact();
        return;
    }

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "";
				let jsonObject = JSON.parse( xhr.responseText );

                if (!jsonObject.results || jsonObject.results.length === 0) {
                    contactsGrid.innerHTML = "<p>No contacts found.</p>";
                    return;
                }

				const filteredResults= jsonObject.results.filter(contact => {
                    const fullName= (contact.FirstName + " " + contact.LastName).toLowerCase();
                    return fullName.includes(srch.toLowerCase());
                });

                filteredResults.sort((a, b)=>{
                    let fullNameA= (a.FirstName + " " + a.LastName).toLowerCase();
                    let fullNameB= (b.FirstName + " " + b.LastName).toLowerCase();
                    return fullNameA.localeCompare(fullNameB);
                });

				for(let i=0; i<filteredResults.length; i++)
				{
                    let contact= filteredResults[i];
                    let email= contact.Email;
                    let firstName= contact.FirstName;
                    let lastName= contact.LastName;
                    let phone= contact.Phone;

                    //contact card
                    const contactCard= document.createElement('div');
                    contactCard.classList.add('addcontacts');

                    //pfp
                    const pfpDiv= document.createElement('div');
                    pfpDiv.classList.add('pfp');
                    const pfpImg= document.createElement('img');
                    pfpImg.classList.add('pfpimg');
                    pfpImg.src= 'images/pfp.png';
                    pfpImg.alt= 'Profile Picture';

                    const initialsDiv= document.createElement('div');
                    initialsDiv.classList.add('initial');
                    initialsDiv.textContent= `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;

                    pfpDiv.appendChild(pfpImg);
                    pfpDiv.appendChild(initialsDiv);

                    //info
                    const contactDetails= document.createElement('div');
                    contactDetails.classList.add('contact-details');

                    const formattedFirstName= firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
                    const formattedLastName= lastName.charAt(0).toUpperCase() +lastName.slice(1).toLowerCase();

                    contactDetails.innerHTML= `
                        <h3>${formattedFirstName} ${formattedLastName}</h3>
                        <p>${email}</p>
                        <p>${formatPhoneNumber(phone)}</p>
                    `;
                
                    //buttons
                    const buttonsDiv= document.createElement('div');
                    buttonsDiv.classList.add('buttons');

                    const editButton = document.createElement('button');
                    editButton.classList.add('edit-btn');
                    editButton.innerHTML = '<img src="images/edit.png" alt="edit" class="button-img" />'; 
                    editButton.addEventListener('click', () => editContact(contactCard, contactDetails, editButton, saveButton));
                    
                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('delete-btn');
                    deleteButton.innerHTML = '<img src="images/delete.png" alt="delete" class="button-img" />';
                    deleteButton.addEventListener('click', () => deleteContact(contactCard,firstName,lastName));

                    const saveButton = document.createElement("button");
                    saveButton.classList.add("save-btn");
                    saveButton.innerHTML = '<img src="images/save.png" alt="save" class="button-img" />';
                    saveButton.style.display = "none";
                    saveButton.addEventListener("click", () => saveEditedContact(contactCard, contactDetails, editButton, saveButton));

                    //apend
                    buttonsDiv.appendChild(saveButton);
                    buttonsDiv.appendChild(editButton);
                    buttonsDiv.appendChild(deleteButton);

                    contactCard.appendChild(pfpDiv);
                    contactCard.appendChild(contactDetails);
                    contactCard.appendChild(buttonsDiv);
                    contactsGrid.appendChild(contactCard);
				}
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}
