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
    $("#otpx").click(function () {
        var urls = base_url + "index.php/member/otp/?callback=?";

        var useremail = $("#useremail").val();
        var otp = $("#otp").val();
        var password = $("#password").val();
        var dataString = "useremail=" + useremail +"&otp=" + otp+"&password=" + password;

        if ($.trim(useremail).length < 3) { 
            swal("Email masih kosong atau salah pengetikan email"); 
        }

        if ($.trim(otp).length < 3) { 
            swal("Kode OTP Penggantian Password masih kosong atau salah pengetikan email"); 
        }

        if ($.trim(password).length < 3) { 
            swal("Password baru masih kosong atau salah pengetikan email"); 
        }

        if ($.trim(useremail).length > 0 && $.trim(otp).length > 0 && $.trim(password).length > 0) {
            $.ajax({
                type: "POST",
                url: urls,
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function () { 
                    $("#main-login").LoadingOverlay("show");
                    $("#otp").val('Cek Kode OTP...'); 
                },
                success: function (data) {
                    if (data['status'] == "OK") {
                        $("#main-login").LoadingOverlay("hide");
                        swal(data['message'], {
                            buttons: {
                                //cancel: "Lain Kali",
                                catch: {
                                text: "Login",
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
                                    slide("login.html");
                                    break;
                                    default:
                                }
                            }); 
                    } else if (data['status'] == "ERROR") {
                        $("#main-login").LoadingOverlay("hide");
                        swal(data['message']);
                        $("#otp").val('Ganti Password');
                    }
                }
            });
        } return false;

    });

    
})

// See Password
function SeePass() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}