$(document).ready(function () {

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

    var userid = getvar("userid");

    var urls = "https://www.dfunstation.com/api4/android/index.php/konsultasi/profile/" + userid + "/userid/peer/?callback=?";
    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                $("#avatar").attr("src", data['avatar']);
                $("#userfullname").html(data['userfullname']);
                $("#userfullname1").html(data['userfullname']);
                $("#userabout").html(data['userabout']);
                $("#usersec").html(data['sec']);
                $("#univ").attr("src", data['logouniv']);

                if (data['busy'] < 1) {
                    if (data['online'] < 1) {
                        $(".steps-controllers").html("<div class=\"p-10\" style=\"width:100%\"><strong>Sedang offline, saat ini tidak bisa berkonsultasi</strong></div>");
                    } else {
                        $(".chat-harga").html("Konsultasi <strong>Gratis</strong> Sekarang");
                        $(".chat-me").html("<button class=\"btn btn-warning\" onclick=\"sendchat();\">Chat</button>");
                    }
                } else {
                    $(".steps-controllers").html("<div class=\"p-10\" style=\"width:100%\"><strong>Konselor sedang sibuk menangani klien, silahkan tunggu atau memilih Konselor lain yang tersedia</strong></div>");
                }
            }
        }
    });
});

function sendchat() {
    swal("Apakah anda yakin akan berkonsultasi atau chat dengan konsultan/dokter ini?", {
        buttons: {
            cancel: "Batal",
            catch: {
                text: "Ya, Chat Sekarang",
                value: "catch",
            }
        },
    })
        .then((value) => {
            switch (value) {
                case "catch":
                    var userid = getvar("userid");
                    //var username = getvar("username");				  
                    slide("readterm.html?userid=" + userid + "&free=4");
                    break;
                default:
            }
        });
    //fade('chat-mulai.html?action=read&userid="+userid+"'
}