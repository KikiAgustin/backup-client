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

    //signup function
    $("#forget_password").click(function () {
        var urls = base_url + "index.php/member/lupapassword/?callback=?";

        var useremail = $("#useremail").val();
        var dataString = "useremail=" + useremail;

        if ($.trim(useremail).length < 3) { 
            swal("Email masih kosong atau salah pengetikan email"); 
        }

        if ($.trim(useremail).length > 0) {
            $.ajax({
                type: "POST",
                url: urls,
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function () { 
                    $("#main-login").LoadingOverlay("show");
                    $("#forget_password").val('Meminta Password...'); 
                },
                success: function (data) {
                    if (data['status'] == "OK") {
                        $("#main-login").LoadingOverlay("hide");
                        swal(data['message'], {
                            buttons: {
                                //cancel: "Lain Kali",
                                catch: {
                                text: "Selanjutnya",
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
                                    //alert('bayar');
                                    //window.location.href= 'chat.html';
                                    slide("otp.html");
                                    break;
                                    default:
                                }
                            }); 
                    }
                    else if (data['status'] == "ERROR") {
                        $("#main-login").LoadingOverlay("hide");
                        swal(data['message']);
                        $("#forget_password").val('Kirim Password');
                    }
                }
            });
        } return false;

    });
})