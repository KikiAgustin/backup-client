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

  // Load Page
  /* $("#content").LoadingOverlay("show");
  setTimeout(function(){
      $("#content").LoadingOverlay("hide");
  }, 3000); */

  //Check Rate App di Google Play
  if (localStorage.getItem('rateapp') != 'shown') {
    setTimeout(function () {
      rateapp();
    }, 1000); // 5000 to load it after 5 seconds from page load
    localStorage.setItem('rateapp', 'shown')
  }

  // Search
  $("#kuncis").on("keypress", function (event) {
    if (event.keyCode === 13) {
      var kuncis = $("#kuncis").val();
      if (kuncis != "") {
        slide("cari-hasil.html?keyword=" + kuncis);
      }
      event.preventDefault();
    }
  });

  //Greeting Message
  var dt = new Date();
  var time = dt.getHours();
  if (time > 0 && time <= 10) { var greeting = "Selamat Pagi"; }
  else if (time > 10 && time <= 14) { var greeting = "Selamat Siang"; }
  else if (time > 14 && time <= 18) { var greeting = "Selamat Sore"; }
  else { var greeting = "Selamat Malam"; }

  $(".menu-profile").html("<strong>Hai, " + localStorage.userfullname + "</strong><br><span class=\"greeting\">" + greeting + ", Semoga Bahagia</span>")

  // Slide
  var urls = base_url + "index.php/home/slide/?callback=?";
  $.ajax({
    type: "GET",
    url: urls,
    crossDomain: true,
    cache: false,
    success: function (data) {
      if (data['status'] == "OK") {
        var slides = data['slide'];
        var dataslide = "";
        for (var key in slides) {
          if (slides.hasOwnProperty(key)) {
            if (slides[key]["jenis"] == "1") dataslide += '<div class="swiper-slide"   onclick="javascript:slide(\'' + slides[key]["url"] + '\')">';
            else dataslide += '<div class="swiper-slide"  onclick="javascript:fade(\'slidemobile.html?action=read&id=' + slides[key]["id"] + '\')">';
            dataslide += '<img src="' + slides[key]["gambar"] + '" alt="" />';
            dataslide += "</div>";
          }
        }
        $("#banner-home-item").html(dataslide);
        var swiper1 = new Swiper('.s1', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 4000,
          loop: true
        });
      }
    }
  });

  // Notifikasi
  var urls = base_url + "index.php/blog/jml-notifikasi/" + localStorage.userid + "/?callback=?";
  $.ajax({
    type: "GET",
    url: urls,
    crossDomain: true,
    cache: false,
    success: function (data) {
      if (data['status'] == "OK") {
        $("#jumlah-notifikasi").html('<span style="font-weight: bold; font-size: 12px; color: red;  ">' + data['jumlah_notif'] + ' </span>');
      }

    }
  });

  // Promo
  var urls = base_url + "index.php/promo/home/?callback=?";
  $.ajax({
    type: "GET",
    url: urls,
    crossDomain: true,
    cache: false,
    success: function (data) {
      if (data['status'] == "OK") {
        var dl = data['datalist'];
        var datalist = "";
        for (var key in dl) {
          if (dl.hasOwnProperty(key)) {
            datalist += '<div class="promo-depan prom"><div class="promo-depan-image"><a href="javascript:fade(\'promo-read.html?action=read&id=' + dl[key]["id"] + '\')"><img src="' + dl[key]["gambar"] + '" alt="" /></a></div>';
            datalist += '<div class="promo-depan-preview p-20"><strong><a href="javascript:fade(\'promo-read.html?action=read&id=' + dl[key]["id"] + '\')">' + dl[key]["nama"] + '</a></strong><br>' + dl[key]["ringkas"] + '</p></div>';
            datalist += '</div>';
          }
        }
        $(".sliding-wrapper").html(datalist);
      }
    }
  });


  // Blog
  var urls = base_url + "index.php/blog/depan/?callback=?";
  $.ajax({
    type: "GET",
    url: urls,
    crossDomain: true,
    cache: false,
    success: function (data) {
      if (data['status'] == "OK") {
        var dl = data['datalist'];
        var datalist = "";
        for (var key in dl) {
          if (dl.hasOwnProperty(key)) {
            datalist += '<div class="promo-depan"><div class="promo-depan-image"><a href="javascript:fade(\'blog-read.html?action=read&id=' + dl[key]["id"] + '\')"><img src="' + dl[key]["gambar"] + '"/></a></div>';
            datalist += '<div class="promo-depan-preview p-20"><strong><a href="javascript:fade(\'blog-read.html?action=read&id=' + dl[key]["id"] + '\')">' + dl[key]["nama"] + '</a></strong><br>' + dl[key]["ringkas"] + '</p></div>';
            datalist += '</div>';
          }
        }
        $(".sliding-wrapper1").html(datalist);
      }
    }
  });
  var onSuccess = function (position) {
    localStorage.setItem('lat', position.coords.latitude);
    localStorage.setItem('long', position.coords.longitude);
    /* alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n'); */
  };

  // onError Callback receives a PositionError object
  //
  function onError(error) {
    /* alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n'); */
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

// Fungsi Rate App di Google Play
function rateapp() {
  swal("Sudahkah menilai aplikasi ini?", {
    buttons: {
      cancel: "Ingatkan Nanti",
      catch: {
        text: "Menilai Sekarang",
        value: "catch",
      }
    },
  })
    .then((value) => {
      switch (value) {
        case "catch":
          window.location.href = 'https://play.google.com/store/apps/details?id=com.dfunstation.apps';
          break;
        default:
      }
    });
  //fade('chat-mulai.html?action=read&userid="+userid+"'
}