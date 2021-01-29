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

    //$("#start").attr("href","javascript:slide('chat-start.html?userid="+userid+"&chatid="+chatid+"')");
});

var timeLeft = 60;
var timerId = setInterval(countdown, 1000);

function countdown() {
    var base_url = "https://www.dfunstation.com/api4/android/";
    var id = getvar("id");
    if (timeLeft == -1) {
        $.ajax({
            type: "GET",
            url: base_url + "index.php/konsultasi/chat-confirm-finish/" + id + "/?callback=?",
            crossDomain: true,
            cache: false,
            success: function (data) {
                if (data['status'] == "OK") {
                    clearTimeout(timerId);
                    document.getElementById("count").innerHTML = 'Mohon maaf, waktu tunggu konfirmasi dari konsultan telah habis.';
                    $("#back").show();
                }
            }
        });
        //doSomething();
    } else {
        $.ajax({
            type: "GET",
            url: base_url + "index.php/konsultasi/chat-confirm/" + id + "/?callback=?",
            crossDomain: true,
            cache: false,
            success: function (data) {
                if (data['status'] == "OK") {
                    //alert(data['harga']);
                    if (data['finish'] == 0) {
                        document.getElementById("count").innerHTML = timeLeft + ' detik menunggu konfirmasi dari konsultan.';
                    } else if (data['finish'] == 1) {
                        clearTimeout(timerId);
                        document.getElementById("count").innerHTML = 'Selamat, konsultasi Anda telah dikonfirmasi konsultan.';
                        $("#confirm").show();
                    } else if (data['finish'] == 2) {
                        clearTimeout(timerId);
                        document.getElementById("count").innerHTML = 'Mohon maaf, konsultasi Anda tidak dikonfirmasi konsultan.';
                        $("#back").show();
                    }
                }
            }
        });
        timeLeft--;
    }
}

function sendchat() {

    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";

    var userid = getvar("userid");
    var free = getvar("free");
    if (free == 0) {
        var urls_ = base_url + "index.php/konsultasi/chat-create/" + localStorage.userid + "/" + userid + "/covid/?callback=?";
    } else if (free == 1) {
        var urls_ = base_url + "index.php/konsultasi/chat-create/" + localStorage.userid + "/" + userid + "/?callback=?";
    } else if (free == 2) {
        var urls_ = base_url + "index.php/konsultasi/chat-create/" + localStorage.userid + "/" + userid + "/gratis/?callback=?";
    } else if (free == 3) {
        //console.log('ok');
        var urls_ = base_url + "index.php/konsultasi/chat-create/" + localStorage.userid + "/" + userid + "/school/?callback=?";
    } else if (free == 4) {
        //console.log('ok');
        var urls_ = base_url + "index.php/konsultasi/chat-create/" + localStorage.userid + "/" + userid + "/peer/?callback=?";
    }
    $.ajax({
        type: "GET",
        url: urls_,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                //alert(data['harga']);
                if (free == 0) {
                    slide("chat-start.html?chatid=" + data['chat_id'] + "&userid=" + userid);
                } else if (free == 1) {
                    localStorage.chatid = data['chat_id'];
                    //slide("chat-bayar.html?chatid="+data['chat_id']);
                    slide("voucher-buy.html??chatid=" + data['chat_id'] + "&userid=" + data['touserid']);
                } else if (free == 2) {
                    slide("chat-start.html?chatid=" + data['chat_id'] + "&userid=" + userid);
                } else if (free == 3) {
                    slide("chat-start.html?chatid=" + data['chat_id'] + "&userid=" + userid);
                }
            } else {
                swal(data['message'], {
                    buttons: {
                        //cancel: "Lain Kali",
                        catch: {
                            text: "Chat Konsultasi Sebelumnya",
                            value: "catch",
                        }
                    },
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    allowOutsideClick: false,
                })
                    .then((value) => {
                        switch (value) {
                            case "catch":
                                //slide("tour.html"); 
                                //slide("claim.html");
                                slide("chat-start.html?chatid=" + data['chat_id'] + "&userid=" + userid);
                                break;
                            default:
                        }
                    });
            }
        }
    });
}