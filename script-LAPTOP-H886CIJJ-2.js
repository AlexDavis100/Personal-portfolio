function togglemenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

/**********PROJECT SLIDES*************** */
var slideIndex = 1;
showSlides(slideIndex);

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Initialize the slides
showSlides(slideIndex);

// Event listeners for the navigation buttons
document.querySelector('.prev').addEventListener('click', function() {
    plusSlides(-1);
});

document.querySelector('.next').addEventListener('click', function() {
    plusSlides(1);
});
