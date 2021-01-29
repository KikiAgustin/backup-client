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
    
    //Load Function
    var urls = base_url+"index.php/konsultasi/covid_kategori/?callback=?";
    $.ajax({
      type: "GET",
      url: urls,
      crossDomain: true,
      cache: false,
      success: function (data) {

        if (data['status'] == "OK") {
          var datalist = "";
          var dl = data['section'];
          var jml = dl.length;
          $("#load_data").html("");

          for (var key in dl) {
            if (dl.hasOwnProperty(key)) {

              datalist += '<span  class="product-sec waves-effect waves-ripple animated fadein"><strong><i class="fal fa-user"></i>  ' + dl[key]["namasec"] + '</strong></span>';
              var submenu = dl[key]["sub"];

              for (var subkey in submenu) {
                if (submenu.hasOwnProperty(subkey)) {
                  datalist += '<a  class="product-sec waves-effect waves-ripple animated fadein" href="javascript:fade(\'covid-konsul-kategori-konsultan.html?action=read&subid=' + submenu[subkey]["subid"] + '&secid=' + dl[key]["secid"] + '\')">' + submenu[subkey]["namasub"] + ' <i class="fal fa-arrow-right right"></i></a>';
                }
              }

            }
          }

          $("#listkonsultan").append(datalist);

        }
      }
    });
})