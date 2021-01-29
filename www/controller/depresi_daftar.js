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

  // Tanggal Lahir
  $( "#tanggal_lahir" ).dateDropper({
		animate: true,
	  
		// bounce, dropDown
		init_animation: "fadein", 
		format: "Y-m-d",
		lang: "en",
	  
		// Set the initial value to current date or lock the control value to current date
		// false(default), from, to.
		lock: false,
		maxYear: new Date().getFullYear(),
		minYear: 1970,
		yearsRange: 10,
	  
		//CSS PRIOPRIETIES
		dropPrimaryColor: "#01CEFF",
		dropTextColor: "#333333",
		dropBackgroundColor: "#FFFFFF",
		dropBorder: "1px solid #08C",
		dropBorderRadius: 8,
		dropShadow: "0 0 10px 0 rgba(0, 136, 204, 0.45)",
		dropWidth: 124,
		dropTextWeight: 'bold'
	});



  // json provinsi
  var urlxs = base_url + "index.php/konsultasi/provinsi/?callback=?";
  $.ajax({
    type: "GET",
    url: urlxs,
    crossDomain: true,
    cache: false,
    success: function (data) {
      if (data["status"] == "OK") {
        var datalist = "";
        var dl = data["section"];
        var x;
        datalist += '<option value="" class="jk" disabled selected>--Pilih--</option>';
        for (x in dl) {
          datalist +=
            '<option id="idprov" value="' +
            dl[x]["propid"] +
            '">' +
            dl[x]["namapropinsi"] +
            "</option>";
        }
        $("#provinsi").append(datalist);
      }
    },
  });


  var urlxs = base_url + "index.php/konsultasi/kota/?callback=?";
  $.ajax({
    type: "GET",
    url: urlxs,
    crossDomain: true,
    cache: false,
    success: function (data) {
      if (data["status"] == "OK") {
        var datalist = "";
        var dl = data["section"];
        var x;
        datalist += '<option value="" class="jk" disabled selected>--Pilih--</option>';
        for (x in dl) {
          datalist +=
            '<option id="idprov" value="' +
            dl[x]["kotaid"] +
            '">' +
            dl[x]["namakota"] +
            "</option>";
        }
        $("#kota").append(datalist);
      }
    },
  });


  // Percobaan ajax
  var urlxxx = base_url + "index.php/konsultasi/kotaid/?callback=?";
  $('#provinsi').change(function () {
    var provinsi_id = $("#provinsi").val();


    $.ajax({
      type: 'POST',
      url: urlxxx,
      data: 'prov_id=' + provinsi_id,
      success: function (data) {
        if (data["status"] == "OK") {
          var datalist = "";
          var dl = data["section"];
          var x;
          datalist += '<option value="" class="jk" disabled selected>--Pilih--</option>';
          for (x in dl) {
            datalist +=
              '<option id="idprov" value="' +
              dl[x]["kotaid"] +
              '">' +
              dl[x]["namakota"] +
              "</option>";
          }
          $("#kotaid").html(datalist);
        }
      }

    });


  });


  // Json Kota
  // $("#idprov").click(function () {
  //   urlkota = base_url + "index.php/konsultasi/kota/?callback=?";
  //   urldkota = base_url + "index.php/konsultasi/kota/?callback=?";
  //   var provinsi = $("#provinsi").val();

  //   var dataString = "idprov=" + idprov;
  //   if (
  //     $.trim(idprov).length > 0
  //   ) {
  //     $.ajax({
  //       type: "POST",
  //       url: urlkota,
  //       data: dataString,
  //       crossDomain: true,
  //       cache: false,
  //       success: function (data) {
  //         if (data["status"] == "OK") {
  //           var datalist = "";
  //           var dl = data["section"];
  //           var x;
  //           datalist += '<option value="" class="jk" disabled selected>--Pilih--</option>';
  //           for (x in dl) {
  //             datalist +=
  //               '<option value="' +
  //               dl[x]["kotaid"] +
  //               '">' +
  //               dl[x]["namakota"] +
  //               "</option>";
  //           }
  //           $("#kota").append(datalist);
  //         }
  //       },
  //     });
  //   }
  // });

  //Register Termometer kecemasan
  $("#signup").click(function () {
    var urls =
      "https://www.dfunstation.com/api4/android/index.php/konsultasi/depresi_daftar/" + localStorage.userid + "/?callback=?";
    var nama_lengkap = $("#nama_lengkap").val();
    var email = $("#email").val();
    var telepon = $("#telepon").val();
    var jenis_kelamin = $("#jenis_kelamin").val();
    var tanggal_lahir = $("#tanggal_lahir").val();
    var status = $("#status").val();
    var provinsi = $("#provinsi").val();
    var kota = $("#kotaid").val();
    var pendidikan = $("#pendidikan").val();
    var pekerjaan = $("#pekerjaan").val();

    if ($.trim(pekerjaan).length < 1) {
      swal("Pekerjaan tolong diisi");
    }

    if ($.trim(telepon).length < 1) {
      swal("Telepon masih kosong atau salah pengetikan");
    }

    if ($.trim(pendidikan).length < 1) {
      swal("pendidikan tolong diisi");
    }
    if ($.trim(kota).length < 1) {
      swal("Nama kota tolong diisi");
    }
    if ($.trim(provinsi).length < 1) {
      swal("Nama Provinsi tolong diisi");
    }
    if ($.trim(status).length < 1) {
      swal("Status tolong disi");
    }
    if ($.trim(tanggal_lahir).length < 1) {
      swal("Tanggal lahir masih kosong");
    }
    if ($.trim(jenis_kelamin).length < 1) {
      swal("Jenis kelamin masih kosong");
    }
    if ($.trim(email).length < 3) {
      swal("email masih kosong atau terlalu pendek");
    }
    if ($.trim(nama_lengkap).length < 3) {
      swal("nama masih kosong atau terlalu pendek");
    }

    var dataString =
      "nama_lengkap=" +
      nama_lengkap +
      "&email=" +
      email +
      "&telepon=" +
      telepon +
      "&jenis_kelamin=" +
      jenis_kelamin +
      "&tanggal_lahir=" +
      tanggal_lahir +
      "&status=" +
      status +
      "&provinsi=" +
      provinsi +
      "&kota=" +
      kota +
      "&pendidikan=" +
      pendidikan +
      "&pekerjaan=" +
      pekerjaan;

    if (
      $.trim(nama_lengkap).length > 0 &&
      $.trim(email).length > 0 &&
      $.trim(telepon).length > 0 &&
      $.trim(jenis_kelamin).length > 0 &&
      $.trim(tanggal_lahir).length > 0 &&
      $.trim(status).length > 0 &&
      $.trim(provinsi).length > 0 &&
      $.trim(kota).length > 0 &&
      $.trim(pendidikan).length > 0
    ) {
      $.ajax({
        type: "POST",
        url: urls,
        data: dataString,
        crossDomain: true,
        cache: false,
        beforeSend: function () {
          $("#signup").val("Connecting...");
        },
        success: function (data) {
          if (data["status"] == "OK") {
            alert(data["message"]);
            slide("depresi_soal.html");
          } else {
            alert(data["message"]);
            return false;
          }
        },
      });
    }
    return false;
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
