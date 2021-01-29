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
  var urlx = base_url + "index.php/konsultasi/termometer_soal/?callback=?";
  $.ajax({
    type: "GET",
    url: urlx,
    crossDomain: true,
    cache: false,
    success: function (data) {
      if (data["status"] == "OK") {
        var datalist = "";
        var dl = data["section"];
        var x;
        for (x in dl) {
          datalist += '<div style="margin-top: 20px;" id="sikap-' + dl[x]["soalid"] + '" class="row  isi-box  ">';
          datalist += '<div class="input-field col s12">';
          datalist += '<strong class="pertanyaan "> <span class="nomor-tes ">' + dl[x]["nomor"] + " </span> " + dl[x]["pertanyaan"] + "</strong>";
          datalist += "<br>";
          datalist += '<div class="pemilihan">';
          datalist += '<input type="radio" id="pilihan' + dl[x]["nomor"] + 'dari' + dl[x]["tidaksamasekali"] + '"  class="pilihan' + dl[x]["nomor"] + '"  name="soal' + dl[x]["nomor"] + '" value="' + dl[x]["tidaksamasekali"] + '" onclick="pilih(' + dl[x]["soalid"] + ')"  >';
          datalist += '<label for="pilihan' + dl[x]["nomor"] + 'dari' + dl[x]["tidaksamasekali"] + '" >Tidak Sama Sekali</label>';
          datalist += "</div>";
          datalist += '<div class="pemilihan">';
          datalist += '<input type="radio" id="pilihan' + dl[x]["nomor"] + 'dari' + dl[x]["jarang"] + '"  class="pilihan' + dl[x]["nomor"] + '"  name="soal' + dl[x]["nomor"] + '" value="' + dl[x]["jarang"] + '" onclick="pilih(' + dl[x]["soalid"] + ')" >';
          datalist += '<label for="pilihan' + dl[x]["nomor"] + 'dari' + dl[x]["jarang"] + '" >Jarang</label>';
          datalist += "</div>";
          datalist += '<div class="pemilihan">';
          datalist += '<input type="radio" id="pilihan' + dl[x]["nomor"] + 'dari' + dl[x]["kadangkadang"] + '"  class="pilihan' + dl[x]["nomor"] + '"  name="soal' + dl[x]["nomor"] + '" value="' + dl[x]["kadangkadang"] + '" onclick="pilih(' + dl[x]["soalid"] + ')" >';
          datalist += '<label for="pilihan' + dl[x]["nomor"] + 'dari' + dl[x]["kadangkadang"] + '" >Kadang-kadang</label>';
          datalist += "</div>";
          datalist += '<div class="pemilihan">';
          datalist += '<input type="radio" id="pilihan' + dl[x]["nomor"] + 'dari' + dl[x]["sering"] + '"  class="pilihan' + dl[x]["nomor"] + '"  name="soal' + dl[x]["nomor"] + '" value="' + dl[x]["sering"] + '" onclick="pilih(' + dl[x]["soalid"] + ')" >';
          datalist += '<label for="pilihan' + dl[x]["nomor"] + 'dari' + dl[x]["sering"] + '" >Sering</label>';
          datalist += "</div>";
          datalist += "</div>";
          datalist += "</div>";
        }
        $("#isi-box").append(datalist);
      }
    },
  });


  // Hasil Tes Termometer
  $("#hasil").click(function () {
    var urls = base_url + "index.php/konsultasi/termometer_kirim/" + localStorage.userid + "/?callback=?";
    var hasil1 = $("input:checked" + ".pilihan1").val();
    var hasil2 = $("input:checked" + ".pilihan2").val();
    var hasil3 = $("input:checked" + ".pilihan3").val();
    var hasil4 = $("input:checked" + ".pilihan4").val();
    var hasil5 = $("input:checked" + ".pilihan5").val();
    var hasil6 = $("input:checked" + ".pilihan6").val();
    var hasil7 = $("input:checked" + ".pilihan7").val();
    var hasil8 = $("input:checked" + ".pilihan8").val();
    var hasil9 = $("input:checked" + ".pilihan9").val();
    var hasil10 = $("input:checked" + ".pilihan10").val();
    var hasil11 = $("input:checked" + ".pilihan11").val();
    var hasil12 = $("input:checked" + ".pilihan12").val();
    var hasil13 = $("input:checked" + ".pilihan13").val();
    var hasil14 = $("input:checked" + ".pilihan14").val();
    var hasil15 = $("input:checked" + ".pilihan15").val();
    var hasil16 = $("input:checked" + ".pilihan16").val();
    var hasil17 = $("input:checked" + ".pilihan17").val();
    var hasil18 = $("input:checked" + ".pilihan18").val();
    var hasil19 = $("input:checked" + ".pilihan19").val();
    var hasil20 = $("input:checked" + ".pilihan20").val();


    if ($.trim(hasil20).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 20");
    }
    if ($.trim(hasil19).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 19");
    }
    if ($.trim(hasil18).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 18");
    }
    if ($.trim(hasil17).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 17");
    }
    if ($.trim(hasil16).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 16");
    }
    if ($.trim(hasil15).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 15");
    }
    if ($.trim(hasil14).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 14");
    }
    if ($.trim(hasil13).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 13");
    }
    if ($.trim(hasil12).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 12");
    }
    if ($.trim(hasil11).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 11");
    }
    if ($.trim(hasil10).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 10");
    }
    if ($.trim(hasil9).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 9");
    }
    if ($.trim(hasil8).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 8");
    }
    if ($.trim(hasil7).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 7");
    }
    if ($.trim(hasil6).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 6");
    }
    if ($.trim(hasil5).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 5");
    }
    if ($.trim(hasil4).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 4");
    }
    if ($.trim(hasil3).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 3");
    }
    if ($.trim(hasil2).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 2");
    }
    if ($.trim(hasil1).length < 1) {
      swal("Tolong isi dulu pertanyaan ke 1");
    }

    var dataString = "hasil1=" + hasil1 + "&hasil2=" + hasil2 + "&hasil3=" + hasil3 + "&hasil4=" + hasil4 + "&hasil5=" + hasil5 + "&hasil6=" + hasil6 + "&hasil7=" + hasil7 + "&hasil8=" + hasil8 + "&hasil9=" + hasil9 + "&hasil10=" + hasil10 + "&hasil11=" + hasil11 + "&hasil12=" + hasil12 + "&hasil13=" + hasil13 + "&hasil14=" + hasil14 + "&hasil15=" + hasil15 + "&hasil16=" + hasil16 + "&hasil17=" + hasil17 + "&hasil18=" + hasil18 + "&hasil19=" + hasil19 + "&hasil20=" + hasil20;

    if (
      $.trim(hasil20).length > 0
    ) {
      $.ajax({
        type: "POST",
        url: urls,
        data: dataString,
        crossDomain: true,
        cache: false,
        beforeSend: function () {
          $("#hasil").val("Connection...");
        },
        success: function (data) {
          if (data["status"] == "OK") {
            alert(data["message"]);
            slide("termometer_hasil.html");
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




// Pilih Soal
function pilih(data) {
  $("#sikap-" + data).addClass("warna-box");
}

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
