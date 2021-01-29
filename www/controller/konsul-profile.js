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

    //Change Password
    var userid = getvar("userid");
    var urls = base_url + "index.php/konsultasi/profile/" + userid + "/userid/?callback=?";
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
                if (data['busy'] < 1) {
                    if (data['online'] < 1) {
                        $(".steps-controllers").html("<div class=\"p-10\" style=\"width:100%\"><strong>Sedang offline, saat ini tidak bisa berkonsultasi</strong></div>");
                    } else {
                        if (data['harga'] > 0) {
                            if (data['diskon'] > 0) {
                                if (data['diskon'] >= 100) {
                                    $(".chat-harga").html("Konsultasi <strong>Gratis</strong> Sekarang");
                                    $(".chat-me").html("<button class=\"btn btn-warning\" onclick=\"sendchat(2);\">Chat</button>");
                                } else {
                                    $(".chat-harga").html("Mulai dengan <br><span style='text-decoration: line-through;'>" + data['hargarp'] + "</span> <span style='font-weight:bold;'>" + data['hargarpx'] + "</span>");
                                    $(".chat-me").html("<button class=\"btn btn-warning\" onclick=\"sendchat(1);\">Chat</button>");
                                }
                            } else {
                                $(".chat-harga").html("Mulai dengan <br><b>" + data['hargarp'] + "</b>");
                                $(".chat-me").html("<button class=\"btn btn-warning\" onclick=\"sendchat(1);\">Chat</button>");
                            }
                        } else {
                            $(".chat-harga").html("Konsultasi <strong>Gratis</strong> Sekarang");
                            $(".chat-me").html("<button class=\"btn btn-warning\" onclick=\"sendchat(0);\">Chat</button>");
                        }
                    }
                } else {
                    $(".steps-controllers").html("<div class=\"p-10\" style=\"width:100%\"><strong>Konselor sedang sibuk menangani klien, silahkan tunggu atau memilih Konselor lain yang tersedia</strong></div>");
                }
            }
        }
    });
});

function sendchat(free) {
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
                    slide("readterm.html?userid=" + userid + "&free=" + free);
                    break;
                default:
            }
        });
    //fade('chat-mulai.html?action=read&userid="+userid+"'
}