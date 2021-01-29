$(document).ready(function () {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4v201/android/";

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
    loading("load_data_message", 3);

    var limit = 5;
    var start = 0;
    var action = 'inactive';

    var lastid = "";

    function load_country_data(limit, start) {
        var urls = base_url + "index.php/konsultasi/konsultan/0/0/" + start + "/" + limit + "/" + localStorage.userid + "/covid/?callback=?";
        $.ajax({
            type: "POST",
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
                                if (datas['verification'] == 1 && datas['verification_until'] >= dt) {
                                    var datalist = "";
                                    var dl = data['datalist'];
                                    var jml = dl.length;
                                    $("#aktif").append('Konsultasi gratis anda aktif sampai');
                                    $("#aktif").append('<br>');
                                    $("#aktif").append('<b>' + datas["verification_tgl"] + '<b>');
                                    if (jml > 0) {
                                        $('#load_data_message').html("");
                                        for (var key in dl) {
                                            if (dl.hasOwnProperty(key)) {
                                                var online = dl[key]["online"];
                                                var busy = dl[key]["busy"];
                                                var chatid = dl[key]["chatid"];

                                                /* if (chatid > 0) {
                                                    datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'chat-start.html?action=read&chatid=' + dl[key]["chatid"] + '&userid=' + dl[key]["id"] + '\')">';
                                                } else {
                                                    datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'covid-konsul-profile\.html?action=read&userid=' + dl[key]["id"] + '\')">';
                                                } */
                                                datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'covid-konsul-profile\.html?action=read&userid=' + dl[key]["id"] + '\')">';
                                                datalist += '<div class="konsultan-item-img">';
                                                datalist += '<div class="konsultan-item-imgbox"><img src="' + dl[key]["avatar"] + '"></div>';
                                                datalist += '</div>';
                                                datalist += '<div class="konsultan-item-info">';
                                                datalist += '<span class="chatnama">' + dl[key]["nama"] + '</span><br>';
                                                datalist += '' + dl[key]["sec"] + '<br>';

                                                datalist += '<span class="chatm">Gratis</span>';
                                                if (busy > 0) {
                                                    datalist += '<br/><span>Akan tersedia pada : ' + dl[key]["habis"] + '</span>';
                                                }
                                                var rate = "";
                                                for (i = 0; i < dl[key]["rating"]; i++) {
                                                    rate += '<i class="fal fa-star"></i>';
                                                }

                                                datalist += '<br><span class="chatrating">' + rate + '</div>';
                                                datalist += '<div class="konsultan-item-status">';

                                                //if (chatid > 0) {
                                                //datalist += '<div class="konsultan-item-status-online">open</div>';
                                                //} else {
                                                if (busy > 0) { datalist += '<div class="konsultan-item-status-online" style="background:red !important">busy</div>'; }
                                                else {
                                                    if (online > 0) { datalist += '<div class="konsultan-item-status-online">online</div>'; }
                                                    else { datalist += '<div class="konsultan-item-status-offline">offline</div>'; }
                                                }
                                                //}

                                                datalist += '</div></div>';
                                                delete (rate);
                                            }
                                        }
                                        $("#load_data").append(datalist);
                                        delete (datalist);
                                    } else {
                                        $("#load_data").append('<h3 style="text-align:center">-- Tidak ada data --</h3>');
                                    }
                                    if (datalist == '') {
                                        $('#load_data_message').html("");
                                        action = 'active';
                                    } else {
                                        $('#load_data_message').html("");
                                        action = "inactive";
                                    }
                                } else {
                                    verification += '<div class="konsultan-item waves-effect waves-ripple animated fadein">';
                                    verification += '<div class="p-20">';
                                    if (datas['selfie_'] === "" || datas['ktp_'] === "" || datas['sktm_'] === "" || datas['need_konsul'] == 0) {
                                        if (datas['verification'] == 1 && datas['verification_until'] <= dt) {
                                            verification += 'Layanan gratis Anda sudah expired pada <strong>' + datas['verification_tgl'] + '</strong>, silakan perbarui dokumen-dokumen pendukung di sini.';
                                        } else if (datas['verification'] == 2) {
                                            verification += datas["tolak_ipk"];
                                        } else {
                                            verification += 'Untuk mengakses layanan ini Anda harus mengajukan keringanan bebas biaya sehingga dapat mengakses layanan ini secara gratis selama 1 bulan penuh, silakan mengunggah dokumen-dokumen pendukung di sini.';
                                        }
                                        verification += '<br><br>';
                                        verification += '<button class="waves-effect waves-light btn-large accent-color width-100 m-b-20 button button-block button-positive" onclick="fade(\'tidakmampu.html\')">Pengguna Bebas Biaya</button>';
                                    } else {
                                        verification += '<strong>Data Anda dalam proses verifikasi. Harap menunggu verifikasi data maksimal 1x24 Jam.</strong>';
                                        verification += '<br><br>';
                                    }
                                    verification += '</div>';
                                    verification += '</div>';
                                    $("#load_data").append(verification);
                                    if (verification == '') {
                                        $('#load_data_message').html("");
                                        action = 'active';
                                    } else {
                                        $('#load_data_message').html("");
                                        action = "inactive";
                                    }
                                }
                            }
                        }
                    });
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

function reset() {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4v201/android/";

    var limit = 5;
    var start = 0;
    var action = 'inactive';

    var lastid = "";
    var urls = base_url + "index.php/konsultasi/konsultan/0/0/" + start + "/" + limit + "/" + localStorage.userid + "/covid/?callback=?";
    $.ajax({
        type: "POST",
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
                            if (datas['verification'] == 1 && datas['verification_until'] >= dt) {
                                var datalist = "";
                                var dl = data['datalist'];
                                var jml = dl.length;
                                if (jml > 0) {
                                    $('#load_data_message').html("");
                                    for (var key in dl) {
                                        if (dl.hasOwnProperty(key)) {
                                            var online = dl[key]["online"];
                                            var busy = dl[key]["busy"];
                                            var chatid = dl[key]["chatid"];

                                            /* if (chatid > 0) {
                                                datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'chat-start.html?action=read&chatid=' + dl[key]["chatid"] + '&userid=' + dl[key]["id"] + '\')">';
                                            } else {
                                                datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'covid-konsul-profile\.html?action=read&userid=' + dl[key]["id"] + '\')">';
                                            } */
                                            datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'covid-konsul-profile\.html?action=read&userid=' + dl[key]["id"] + '\')">';
                                            datalist += '<div class="konsultan-item-img">';
                                            datalist += '<div class="konsultan-item-imgbox"><img src="' + dl[key]["avatar"] + '"></div>';
                                            datalist += '</div>';
                                            datalist += '<div class="konsultan-item-info">';
                                            datalist += '<span class="chatnama">' + dl[key]["nama"] + '</span><br>';
                                            datalist += '' + dl[key]["sec"] + '<br>';

                                            datalist += '<span class="chatm">Gratis</span>';
                                            if (busy > 0) {
                                                datalist += '<br/><span>Akan tersedia pada : ' + dl[key]["habis"] + '</span>';
                                            }
                                            var rate = "";
                                            for (i = 0; i < dl[key]["rating"]; i++) {
                                                rate += '<i class="fal fa-star"></i>';
                                            }

                                            datalist += '<br><span class="chatrating">' + rate + '</div>';
                                            datalist += '<div class="konsultan-item-status">';

                                            //if (chatid > 0) {
                                            //datalist += '<div class="konsultan-item-status-online">open</div>';
                                            //} else {
                                            if (busy > 0) { datalist += '<div class="konsultan-item-status-online" style="background:red !important">busy</div>'; }
                                            else {
                                                if (online > 0) { datalist += '<div class="konsultan-item-status-online">online</div>'; }
                                                else { datalist += '<div class="konsultan-item-status-offline">offline</div>'; }
                                            }
                                            //}

                                            datalist += '</div></div>';
                                            delete (rate);
                                        }
                                    }
                                    $("#load_data").html(datalist);
                                    delete (datalist);
                                } else {
                                    $("#load_data").html('<h3 style="text-align:center">-- Tidak ada data --</h3>');
                                }
                                if (datalist == '') {
                                    $('#load_data_message').html("");
                                    action = 'active';
                                } else {
                                    $('#load_data_message').html("");
                                    action = "inactive";
                                }
                            } else {
                                verification += '<div class="konsultan-item waves-effect waves-ripple animated fadein">';
                                verification += '<div class="p-20">';
                                if (datas['selfie_'] === "" || datas['ktp_'] === "" || datas['sktm_'] === "") {
                                    if (datas['verification'] > 0 && datas['verification_until'] <= dt) {
                                        verification += 'Layanan gratis Anda sudah expired pada <strong>' + datas['verification_tgl'] + '</strong>, silakan perbarui dokumen-dokumen pendukung di sini.';
                                    } else {
                                        verification += 'Untuk mengakses layanan ini Anda harus mengajukan keringanan bebas biaya sehingga dapat mengakses layanan ini secara gratis selama 1 bulan penuh, silakan mengunggah dokumen-dokumen pendukung di sini.';
                                    }
                                    verification += '<br><br>';
                                    verification += '<button class="waves-effect waves-light btn-large accent-color width-100 m-b-20 button button-block button-positive" onclick="fade(\'tidakmampu.html\')">Pengguna Bebas Biaya</button>';
                                } else if (datas['verification'] == 2) {
                                    verification += '<strong>Maaf permintaan Anda tidak disetujui, karena ada beberapa data yang tidak dikirim/ data yang dikirim tidak sesuai. Silakan unggah kembali data Anda.</strong>';
                                    verification += '<br><br>';
                                    verification += '<button class="waves-effect waves-light btn-large accent-color width-100 m-b-20 button button-block button-positive" onclick="fade(\'tidakmampu.html\')">Pengguna Bebas Biaya</button>';
                                    verification += '<br><br>';
                                } else {
                                    verification += '<strong>Data Anda dalam proses verifikasi. Harap menunggu verifikasi data maksimal 1x24 Jam.</strong>';
                                    verification += '<br><br>';
                                }
                                verification += '</div>';
                                verification += '</div>';
                                $("#load_data").html(verification);
                                if (verification == '') {
                                    $('#load_data_message').html("");
                                    action = 'active';
                                } else {
                                    $('#load_data_message').html("");
                                    action = "inactive";
                                }
                            }
                        }
                    }
                });
            }
        }
    });
}