$(document).ready(function () {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4v201/android/";

    //Check Login
    /* if (localStorage.tour == "" || localStorage.tour == null) {
        slide("tour.html");
    } */

    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);

    if (localStorage.login == "true" && filename == 'login.html') {
        window.location.href = "index.html";
        var userfullname = localStorage.userfullname;
    } else if (localStorage.login == null) {
        window.location.href = "login.html";
    } else if (localStorage.login == "false" && filename != 'login.html') {
        window.location.href = "login.html";
    }



    // Persetujuan

    $("#kirim").click(function () {
        var urlx = base_url + "index.php/konsultasi/need_konsul/" + localStorage.userid + "?callback=?";
        var persetujuan = $("input:checked" + "#persetujuan").val();

        if ($.trim(persetujuan).length < 1) {
            swal("Tolong Ceklis dulu persetujuan diatas");
        }

        var dataString = "persetujuan=" + persetujuan;

        if ($.trim(persetujuan).length > 0) {
            $.ajax({
                type: "POST",
                url: urlx,
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function () {
                    $("#persetujuan").val("Connection...");
                },
                success: function (data) {
                    if (data["status"] == "OK") {
                        alert(data["message"]);
                        slide("covid_konsul.html");
                    } else {
                        alert(data["message"]);
                        return false;
                    }
                },
            });
        }
        return false;
    });
});