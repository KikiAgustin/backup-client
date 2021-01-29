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
    var urls = base_url + "index.php/konsultasi/school_group/"+ localStorage.userid +"?callback=?";
    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                var verification = "";
                var urls2 = base_url + "index.php/profile/profile/" + localStorage.userid + "/?callback=?";
                $.ajax({
                    type: "GET",
                    url: urls2,
                    crossDomain: true,
                    cache: false,
                    success: function (datas) {
                        if (datas['status'] == "OK") {
                            //alert('ok');
                            var d = new Date(),
                                month = '' + (d.getMonth() + 1),
                                day = '' + d.getDate(),
                                year = d.getFullYear();

                            if (month.length < 2)
                                month = '0' + month;
                            if (day.length < 2)
                                day = '0' + day;

                            var dt = [year, month, day].join('-');
                            if (datas['mitraid'] > 0 && datas['mitraid_until'] >= dt) {
                                $("#juds").html('Group Chat '+data['nama']);
                                var datalist = "";
                                var dl = data['section'];
                                var jml = dl.length;
                                $("#load_data").html("");
                                for (var key in dl) {
                                    if (dl.hasOwnProperty(key)) {
                                        datalist += '<a class="product-sec waves-effect waves-ripple animated fadein" href="javascript:fade(\'chat-group.html?action=read&chatid=' + dl[key]["id"] + '&userid=' + localStorage.userid + '\')"><strong><i class="fal fa-users"></i>  ' + dl[key]["nama"] + '</strong> <i class="fal fa-arrow-right right"></i></a>';
                                        /* var submenu = dl[key]["sub"];
                
                                        for (var subkey in submenu) {
                                            if (submenu.hasOwnProperty(subkey)) {
                
                                                datalist += '<a  class="product-sec waves-effect waves-ripple animated fadein" href="javascript:fade(\'konsul-kategori-konsultan.html?action=read&subid=' + submenu[subkey]["subid"] + '&secid=' + dl[key]["secid"] + '\')">' + submenu[subkey]["namasub"] + ' <i class="fal fa-arrow-right right"></i></a>';
                                            }
                                        } */
                                    }
                                }
                                $("#load_data").append(datalist);
                            } else {
                                verification += '<div class="konsultan-item waves-effect waves-ripple animated fadein">';
                                verification += '<div class="p-20">';
                                if (datas['mitraid'] > 0 && datas['mitraid_until'] <= dt) {
                                    verification += 'Layanan School Counseling Anda sudah expired pada <strong>' + datas['mitraid_tgl'] + '</strong>, silakan perbarui dokumen-dokumen pendukung di sini.';
                                } else {
                                    verification += 'Untuk mengakses layanan ini Anda harus menjadi member sekolah di sini.';
                                }
                                verification += '<br><br>';
                                verification += '<button class="waves-effect waves-light btn-large accent-color width-100 m-b-20 button button-block button-positive" onclick="fade(\'membersekolah.html\')">Member Sekolah</button>';
                                verification += '</div>';
                                verification += '</div>';
                                $("#load_data").append(verification);
                            }
                        }
                    }
                });
            }
        }

    });
});