//Preloader
window.addEventListener('load', function () {
   setTimeout(function () {
       document.getElementById("loader").remove();
   }, 10000);
});

//To Top Button
//Get the button
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Get Current Year
const currentYear = new Date().getFullYear();
let year = document.getElementById('year');
year.textContent = currentYear;


//Form
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    var json = JSON.stringify(object);
    result.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
            } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
            }
        })
        .catch((error) => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
});

//Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

//Mobile Menu

let mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
let drawer = document.getElementById('drawer');
let closeBtn = document.getElementById('close-btn');

mobileMenuTrigger.addEventListener('click', () => {
    drawer.classList.add('slide-in');
});

closeBtn.addEventListener('click', () => {
    drawer.classList.remove('slide-in');
});

//Add-Remove Active Class From Primary Menu
const activeLink = document.querySelectorAll('.primary-nav ul li');
for (let clickTab of activeLink) {
    clickTab.onclick = function () {
        let activeClass = document.querySelectorAll('li.active');
        activeClass[0].classList.remove('active')
        clickTab.classList.add('active');
    }
}

//Sidebar Menu List Active Deactive Class
const activeLinkSidebar = document.querySelectorAll('.sidemenu .inner-menu ul li');

for (let clickTab of activeLinkSidebar) {
    clickTab.addEventListener('click', function () {
        let activeClass = document.querySelectorAll('.sidemenu .inner-menu ul li.active');
        console.log(activeClass);
        activeClass[0].classList.remove('active')
        clickTab.classList.add('active');
    })
}