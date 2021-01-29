$(document).ready(function () {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";

    //Check Login
    /* if (localStorage.tour == "" || localStorage.tour == null) {
        window.location.href = "tour.html";
    } */
    var userid = localStorage.userid;

    if (userid != null && userid != "undefined") {
        slide("index.html");
    }

    //Load Konten Tour
    var swiper = new Swiper('.slider', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 5000,
        loop: true
    });
});


function skip() {
    localStorage.tour = "1";
    var userid = localStorage.getItem("userid");
    var usertipe = localStorage.getItem("usertipe");
    if (usertipe == 1) {
        //slide("konsultan_index.html"); 
        slide("login.html");
    } else if (usertipe == 3) {
        //slide("mitra_index.html"); 
        slide("login.html");
    } else if (usertipe == 0) {
        //slide("index.html"); 
        slide("login.html");
    }
}