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
    var datalist = "";

    //$("#start").attr("href","javascript:slide('chat-start.html?userid="+userid+"&chatid="+chatid+"')");

    var urls = base_url + "index.php/home/term/" + localStorage.userid + "/?callback=?";
    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                datalist += '<br clear="all"><div class="card w100 m-t-10 animated fadein delay-1" style="width:90%; margin-top:10px">' + data['lengkap'] + '<br><br></div>';

                $("#load_data").append(datalist);
            }
        }
    });
});

function sendwait() {

    $("#sendwait").html('Mohon Tunggu...');
    $("#sendwait").attr("disabled", true);
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";

    var userid = getvar("userid");
    var free = getvar("free");
    if (free == 0) {
        var urls_ = base_url + "index.php/konsultasi/chat-wait/" + localStorage.userid + "/" + userid + "/covid/?callback=?";
    } else if (free == 1) {
        var urls_ = base_url + "index.php/konsultasi/chat-wait/" + localStorage.userid + "/" + userid + "/?callback=?";
    } else if (free == 2) {
        var urls_ = base_url + "index.php/konsultasi/chat-wait/" + localStorage.userid + "/" + userid + "/gratis/?callback=?";
    } else if (free == 3) {
        //console.log('ok');
        var urls_ = base_url + "index.php/konsultasi/chat-wait/" + localStorage.userid + "/" + userid + "/school/?callback=?";
    } else if (free == 4) {
        //console.log('ok');
        var urls_ = base_url + "index.php/konsultasi/chat-wait/" + localStorage.userid + "/" + userid + "/peer/?callback=?";
    }
    $.ajax({
        type: "GET",
        url: urls_,
        crossDomain: true,
        cache: false,
        success: function (data) {
            console.log(data);
            if (data['status'] == "OK") {
                //alert(data['harga']);
                slide("chat-confirm.html?free=" + free + "&userid=" + userid+ "&id=" + data['chat_id']);
            } else {
                swal(data['message']);
                $("#sendwait").html('Mulai Konsultasi');
                $("#sendwait").attr("disabled", false);
            }
        }
    });
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