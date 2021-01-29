$(document).ready(function () {



  var limit = 5;
  var start = 0;
  var action = 'inactive';
  var datalist = "";
  var lastid = "";

  function load_country_data(limit, start) {
    var urls = "https://www.dfunstation.com/api4/android/index.php/blog/notifikasi/" + localStorage.userid + "/?callback=?";


    $.ajax({
      type: "GET",
      url: urls,
      crossDomain: true,
      cache: false,
      success: function (data) {



        if (data['status'] == "OK") {
          var datalist = "";
          var dl = data['datalist'];
          var jml = dl.length;

          if (jml > 0) {

            // style="background-color: #d7d9d7;"
            for (var key in dl) {
              if (dl.hasOwnProperty(key)) {
                datalist += '<div style=" ' + dl[key]["status"] + ' " onclick="javascript:fade(\'update-read.html?action=read&updateid=' + dl[key]["id_notifikasi_update"] + '&userid=' + localStorage.userid + '\')" class="animated fadein notif-item waves-effect waves-ripple">';
                datalist += '<p style="padding-left: 15px;">';
                datalist += '<b><span> ' + dl[key]["judul"] + '  </span></b><br>' + dl[key]["create_date"];
                datalist += '</p>';
                datalist += '</div>';

              }
            }
            $("#load_data").append(datalist);

          }

          if (datalist == '' || datalist == null) {
            $('#load_data_message').html("");
            action = 'active';
          }

        } else {
          $('#load_data_message').html("<div class=\"loading\"><center><img src=\"img/loading.svg\" /></center></div>");
          action = "inactive";
        }
      }
    });

    // Notifikasi
    var urls = "https://www.dfunstation.com/api4/android/index.php/blog/jml-notifikasi/" + localStorage.userid + "/?callback=?";
    $.ajax({
      type: "GET",
      url: urls,
      crossDomain: true,
      cache: false,
      success: function (data) {
        if (data['status'] == "OK") {
          $("#jumlah-notifikasi").html('(' + data['jumlah_notif'] + ')');
        }

      }
    });
  }

  if (action == 'inactive') {
    action = 'active';
    load_country_data(limit, start);
  }

  $("#content").scroll(function () {
    if ($("#content").scrollTop() + $("#content").height() > $("#load_data").height() && action == 'inactive') {
      action = 'active';
      start = start + limit;
      setTimeout(function () {
        load_country_data(limit, start);
      }, 1000);
    }
  });

});

function deleteRiwayat(i) {
  swal("Anda tidak mengkonfirmasi chat ini, apakah anda ingin menghapusnya dari beranda?", {
    buttons: {
      cancel: "Batal",
      catch: {
        text: "Hapus",
        value: "catch",
      }
    },
  })
    .then((value) => {
      switch (value) {
        case "catch":
          var urls = "https://www.dfunstation.com/api4/consultant/index.php/konsultasi/delete-riwayat/" + i + "/?callback=?";
          $.ajax({
            type: "GET",
            url: urls,
            crossDomain: true,
            cache: false,
            success: function (data) {
              if (data['status'] == "OK") {
                fade('index.html');
              }
            }
          });
          break;
        default:
      }
    });
}