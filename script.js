function toggleMenu(){
    const menu= document.querySelector(".menu-links");
    const icon= document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");

}

function toggleMenu1(){
    const menu= document.querySelector(".menu-links1");
    const icon= document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");

}

//toggle form visibility
document.getElementById('toggleform').addEventListener('click', function (){
    const contactForm= document.getElementById('contact-form');
    contactForm.style.display=
        contactForm.style.display=== 'none' || contactForm.style.display=== '' ? 'flex' : 'none';
  });

