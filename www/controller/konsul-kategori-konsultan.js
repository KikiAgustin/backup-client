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
    loading("load_data_message", 3);

    var limit = 5;
    var start = 0;
    var action = 'inactive';
    var lastid = "";
    var secid = getvar("secid");
    var subid = getvar("subid");

    function load_country_data(limit, start) {
        var urls = base_url + "index.php/konsultasi/konsultan_berbayar/" + secid + "/" + subid + "/" + start + "/" + limit + "/" + localStorage.userid + "/?callback=?";
        $.ajax({
            type: "POST",
            url: urls,
            crossDomain: true,
            cache: false,
            success: function (data) {
                if (data['status'] == "OK") {
                    var datalist = "";
                    var dl = data['datalist'];
                    var catname = data['kategori'];
                    var jml = dl.length;
                    $('.catname').html(catname);
                    if (jml > 0) {
                        $('#load_data_message').html("");
                        for (var key in dl) {
                            if (dl.hasOwnProperty(key)) {
                                var harga = dl[key]["harga"];
                                var online = dl[key]["online"];
                                var busy = dl[key]["busy"];
                                var chatid = dl[key]["chatid"];
                                var diskon = dl[key]["diskon"];
                                var hargax = dl[key]["hargax"];
                                var hargarpx = dl[key]["hargarpx"];
                                var hargarp = dl[key]["hargarp"];

                                /* if (chatid > 0) {
                                    datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'chat-start.html?action=read&chatid=' + dl[key]["chatid"] + '&userid=' + dl[key]["id"] + '\')">';
                                } else {
                                    datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'konsul-profile\.html?action=read&userid=' + dl[key]["id"] + '\')">';
                                } */
                                datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'konsul-profile\.html?action=read&userid=' + dl[key]["id"] + '\')">';
                                datalist += '<div class="konsultan-item-img">';
                                datalist += '<div class="konsultan-item-imgbox"><img src="' + dl[key]["avatar"] + '"></div>';
                                datalist += '</div>';
                                datalist += '<div class="konsultan-item-info">';
                                datalist += '<span class="chatnama">' + dl[key]["nama"] + '</span><br>';
                                datalist += '' + dl[key]["sec"] + '<br>';

                                if (harga > 0) {
                                    if (diskon > 0) {
                                        if (diskon >= 100) {
                                            datalist += '<span class="chatm">Mulai chat <span style="text-decoration: line-through;">' + hargarp + '</span> <span style="font-weight:bold;">Gratis!</span></span>';
                                        } else {
                                            datalist += '<span class="chatm">Mulai chat <span style="text-decoration: line-through;">' + hargarp + '</span> <span style="font-weight:bold;">' + hargarpx + '</span></span>';
                                        }
                                    } else {
                                        datalist += '<span class="chatm">Mulai chat <span style="font-weight:bold;">' + hargarp + '</span></span>';
                                    }
                                } else {
                                    datalist += '<span class="chatm">Gratis!</span>';
                                }
                                if (busy > 0) { 
                                    datalist += '<br/><span>Akan tersedia pada : '+dl[key]["habis"]+'</span>'; 
                                }
                                datalist += '<br><span class="chatrating"><i class="fal fa-star"></i><i class="fal fa-star"></i><i class="fal fa-star"></i><i class="fal fa-star"></i><i class="fal fa-star"></i></div>';
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
                    }
                    else {
                        $('#load_data_message').html("");
                        action = "inactive";
                    }
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
    var base_url = "https://www.dfunstation.com/api4/android/";

    var limit = 5;
    var start = 0;
    var action = 'inactive';
    var lastid = "";
    var secid = getvar("secid");
    var subid = getvar("subid");
    var urls = base_url + "index.php/konsultasi/konsultan_berbayar/" + secid + "/" + subid + "/" + start + "/" + limit + "/" + localStorage.userid + "/?callback=?";
    $.ajax({
        type: "POST",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                var datalist = "";
                var dl = data['datalist'];
                var catname = data['kategori'];
                var jml = dl.length;

                $('.catname').html(catname);

                if (jml > 0) {
                    $('#load_data_message').html("");
                    for (var key in dl) {
                        if (dl.hasOwnProperty(key)) {
                            var harga = dl[key]["harga"];
                            var online = dl[key]["online"];
                            var busy = dl[key]["busy"];
                            var chatid = dl[key]["chatid"];
                            var diskon = dl[key]["diskon"];
                            var hargax = dl[key]["hargax"];
                            var hargarpx = dl[key]["hargarpx"];
                            var hargarp = dl[key]["hargarp"];
                            /* if (chatid > 0) {
                                datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'chat-start.html?action=read&chatid=' + dl[key]["chatid"] + '&userid=' + dl[key]["id"] + '\')">';
                            } else {
                                datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'konsul-profile\.html?action=read&userid=' + dl[key]["id"] + '\')">';
                            } */
                            datalist += '<div class="konsultan-item waves-effect waves-ripple animated fadein" onclick="fade(\'konsul-profile\.html?action=read&userid=' + dl[key]["id"] + '\')">';
                            datalist += '<div class="konsultan-item-img">';
                            datalist += '<div class="konsultan-item-imgbox"><img src="' + dl[key]["avatar"] + '"></div>';
                            datalist += '</div>';
                            datalist += '<div class="konsultan-item-info">';
                            datalist += '<span class="chatnama">' + dl[key]["nama"] + '</span><br>';
                            datalist += '' + dl[key]["sec"] + '<br>';

                            if (harga > 0) {
                                if (diskon > 0) {
                                    if (diskon >= 100) {
                                        datalist += '<span class="chatm">Mulai chat <span style="text-decoration: line-through;">' + hargarp + '</span> <span style="font-weight:bold;">Gratis!</span></span>';
                                    } else {
                                        datalist += '<span class="chatm">Mulai chat <span style="text-decoration: line-through;">' + hargarp + '</span> <span style="font-weight:bold;">' + hargarpx + '</span></span>';
                                    }
                                } else {
                                    datalist += '<span class="chatm">Mulai chat <span style="font-weight:bold;">' + hargarp + '</span></span>';
                                }
                            } else {
                                datalist += '<span class="chatm">Gratis!</span>';
                            }
                            if (busy > 0) { 
                                datalist += '<br/><span>Akan tersedia pada : '+dl[key]["habis"]+'</span>'; 
                            }
                            datalist += '<br><span class="chatrating"><i class="fal fa-star"></i><i class="fal fa-star"></i><i class="fal fa-star"></i><i class="fal fa-star"></i><i class="fal fa-star"></i></div>';
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

                        }
                    }
                    $("#load_data").html(datalist);
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
            }
        }
    });
}