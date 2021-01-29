$(document).ready(function () {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";

    //Check Login
    if (localStorage.tour == "" || localStorage.tour == null) {
        window.location.href = "tour.html";
    }
    var userid = localStorage.userid;

    if (userid != null && userid != "undefined") {
        slide("index.html");
    }

    //Load Konten Term Daftar
    var datalist = "";
    var urls = base_url + "index.php/home/termdaftar/" + localStorage.userid + "/?callback=?";
    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                datalist += '<br clear="all"><div class="card w100 m-t-10 animated fadein delay-1" style="width:90%; margin-top:10px"><h3>' + data['judul'] + '</h3>' + data['lengkap'] + '<br><br><a href="register.html" class="btn primary-color btn-block waves waves-ripple">Setuju dan Lanjutkan <i class="fal fa-arrow-right"><i></a></div>';
                $("#load_data").append(datalist);
            }
        }
    });
});
