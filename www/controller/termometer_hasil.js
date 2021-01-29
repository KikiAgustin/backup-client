$(document).ready(function () {
  // Base URL
  var base_url = "https://www.dfunstation.com/api4/android/";

  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf("/") + 1);

  if (localStorage.login == "true" && filename == "login.html") {
    window.location.href = "index.html";
    var userfullname = localStorage.userfullname;
  } else if (localStorage.login == null) {
    window.location.href = "login.html";
  } else if (localStorage.login == "false" && filename != "login.html") {
    window.location.href = "login.html";
  }

  // Gambaran kondisi saat ini
  var urlx = base_url + "index.php/konsultasi/termometer_hasil/" + localStorage.userid + "?callback=?";
  $.ajax({
    type: "GET",
    url: urlx,
    crossDomain: true,
    cache: false,
    success: function (data) {
      if (data["status"] == "OK") {
        var datalist = "";
        var nama = data["nama"];
        var keterangan = data["keterangan"];
        datalist += '<p style="padding-right: 20px; text-align: center;  " class="isi-form-p  "> Anda Saat ini <b> ' + nama + "</b></p>";
        datalist += '<p style="padding-right: 20px; text-align: center; " class="isi-form-p  ">' + keterangan + "</p>";
        $("#isi-box").append(datalist);
      }
    },
  });
});

// Scroll Loaded
var myScroll;
function loaded() {
  myScroll = new IScroll("#content", { mouseWheel: true });
}

// See Password
function SeePass() {
  var x = document.getElementById("userpassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function dob(elem) {
  const date1 = new Date(elem);
  const date2 = Date.now();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffYears = diffDays / 365;
  if (diffYears > 18) {
    $("#chk").hide();
  } else {
    $("#chk").show();
  }
  //alert(diffYears);
}
