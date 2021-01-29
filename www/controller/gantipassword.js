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
    var urls = base_url + "index.php/member/gantipassword/?callback=?";
    $("#change_password").click(function () {
      var old_password = $("#old_password").val();
      var new_password = $("#new_password").val();
      var new_password2 = $("#new_password2").val();

      if ($.trim(old_password).length < 1) {
        alert("Password lama anda masih kosong");
        return false;
      }
      if ($.trim(new_password).length < 6) {
        alert("Password baru anda terlalu pendek, minimal 6 karakter");
        return false;
      }
      if (new_password !== new_password2) {
        alert("Password baru anda tidak sama, silahkan periksa kembali");
        return false;
      }

      var dataString = "old_password=" + old_password + "&new_password=" + new_password + "&new_password2=" + new_password2 + "&userid=" + localStorage.userid;

      if ($.trim(new_password).length > 0 & $.trim(old_password).length > 0) {
        $.ajax({
          type: "POST",
          url: urls,
          data: dataString,
          crossDomain: true,
          cache: false,
          beforeSend: function () { $("#change_password").val('Connecting...'); },
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

// See Password
function SeePass() {
    var x = document.getElementById("old_password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function SeePass2() {
    var x = document.getElementById("new_password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function SeePass3() {
    var x = document.getElementById("new_password2");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}