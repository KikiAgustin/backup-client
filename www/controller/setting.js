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

  //Load Konten Term Daftar
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
      }
    }
  });
});

function logout() {
  swal("Apakah anda yakin ingin keluar dari aplikasi ini", {
    buttons: {
      cancel: "Batal",
      catch: {
        text: "Keluar",
        value: "catch",
      }
    },
  })
    .then((value) => {
      switch (value) {
        case "catch":
          var urls = "https://www.dfunstation.com/api4/consultant/index.php/konsultasi/delete-device/" + localStorage.userid + "/?callback=?";
          $.ajax({
            type: "GET",
            url: urls,
            crossDomain: true,
            cache: false,
            success: function (data) {
              if (data['status'] == "OK") {
                localStorage.removeItem('login');
                localStorage.removeItem('email');
                localStorage.removeItem('userid');
                localStorage.removeItem('userfullname');
                localStorage.removeItem('avatar');
                localStorage.removeItem('deviceid');
                localStorage.removeItem('verification_need');
                localStorage.removeItem('verification');
                localStorage.removeItem('verification_until');
                localStorage.removeItem('usia18');
                localStorage.clear();
                slide("login.html");
              }
            }
          });
          break;
        default:
      }

    });
}

// function logout() {
//   localStorage.removeItem('login');
//   localStorage.removeItem('email');
//   localStorage.removeItem('userid');
//   localStorage.removeItem('userfullname');
//   localStorage.removeItem('avatar');
//   localStorage.removeItem('deviceid');
//   localStorage.removeItem('verification_need');
//   localStorage.removeItem('verification');
//   localStorage.removeItem('verification_until');
//   localStorage.removeItem('usia18');
//   localStorage.clear();
//   slide("login.html");
// }
