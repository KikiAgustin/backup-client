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
    var urls = base_url+"index.php/konsultasi/profile/" + userid + "/userid/school/?callback=?";
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

          //if (data['busy'] < 1) {
            if (data['online'] < 1) {
              $(".steps-controllers").html("<div class=\"p-10\" style=\"width:100%\"><strong>Sedang offline, saat ini tidak bisa berkonsultasi</strong></div>");
            } else {
              $(".chat-harga").html("Konsultasi <strong>Gratis</strong> Sekarang");
              $(".chat-me").html("<button class=\"btn btn-warning\" onclick=\"sendchat();\">Chat</button>");
            }
          //} else {
            //$(".steps-controllers").html("<div class=\"p-10\" style=\"width:100%\"><strong>Konselor sedang sibuk menangani klien, silahkan tunggu atau memilih Konselor lain yang tersedia</strong></div>");
          //}
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
		  	console.log('ok');
			// Base URL 
			var base_url = "https://www.dfunstation.com/api4/android/";
		    var urls = base_url + "index.php/profile/profile/" + localStorage.userid + "/?callback=?";
		    $.ajax({
		        type: "GET",
		        url: urls,
		        crossDomain: true,
		        cache: false,
		        success: function (data) {
		            if (data['status'] == "OK") {
		                var userid = getvar("userid");			  
            			slide("schoolterm.html?userid=" + userid + "&mitra="+data['mitraid']+"&free=3");
		            }
		        }
		    });
            break;
          default:
        }
      });
    //fade('chat-mulai.html?action=read&userid="+userid+"'
}