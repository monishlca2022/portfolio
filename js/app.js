//Preloader
window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById("loader").remove();
    }, 10000);
});

//To Top Button
//Get the button:
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
