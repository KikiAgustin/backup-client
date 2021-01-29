$(document).ready(function () {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";

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

    //Load Profile
    var urls = base_url + "index.php/profile/profile/" + localStorage.userid + "/?callback=?";
    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                $(".topmenu-poin").html(data['point'] + " Poin");
                $(".jmlpoint").html(data['point']);
                $(".jmlnotif").html(data['jmlnotif']);
                $("#userfullname").val(data['userfullname']);
                $("#userdob").val(data['userdob']);
                $("#useraddress").val(data['useraddress']);
                $("#useremail").val(data['useremail']);
                $("#userphonegsm").val(data['userphonegsm']);
                $("#userabout").val(data['userabout']);
            }
        }
    });

    // Edit Profile
    var urlx = base_url + "index.php/member/setting/?callback=?";
    $("#gantiprofile").click(function () {
        var userfullname = $("#userfullname").val();
        var userdob = $("#userdob").val();
        var useraddress = $("#useraddress").val();
        var useremail = $("#useremail").val();
        var userphonegsm = $("#userphonegsm").val();
        var userabout = $("#userabout").val();

        if ($.trim(userfullname).length < 3) {
            alert("Nama lengkap anda masih kosong");
            return false;
        }

        var dataString = "userfullname=" + userfullname + "&userdob=" + userdob + "&useraddress=" + useraddress + "&useremail=" + useremail + "&userphonegsm=" + userphonegsm + "&userabout=" + userabout + "&userid=" + localStorage.userid;

        if ($.trim(userfullname).length > 0 & $.trim(useremail).length > 0) {
            $.ajax({
                type: "POST",
                url: urlx,
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function () { $("#gantiprofile").val('Connecting...'); },
                success: function (data) {
                    if (data['status'] == "OK") {
                        alert(data['message']);
                        slide("setting.html");
                    }
                    else {
                        alert(data['message']);
                        return false;
                    }

                }
            });
        } return false;

    });
});