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
    var urls = base_url + "index.php/konsultasi/materi/"+ localStorage.userid +"?callback=?";
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
                                $("#juds").html('Materi Sekolah '+data['nama']);
                                var datalist = "";
                                var dl = data['section'];
                                var jml = dl.length;
                                $("#load_data").html("");
                                for (var key in dl) {
                                    if (dl.hasOwnProperty(key)) {
                                        datalist += '<div class="headx product-sec waves-effect waves-ripple animated fadein"><strong><i class="fal fa-book"></i>  ' + dl[key]["nama"] + '</strong></div>';
                                        datalist += '<div class="bodyx" style="display:none">';
                                            datalist += '<ul class="product-sec animated fadein">';
                                                var submenu = dl[key]["sub"];
                                                for (var subkey in submenu) {
                                                    if (submenu.hasOwnProperty(subkey)) {
                                                        datalist += '<li style="padding:10px;border-bottom:solid #ddd 1px"><a href="javascript:fade(\'materi-kelas.html?action=read&chatid='+ dl[key]["id"]+'&materi=' + submenu[subkey]["subid"] + '&userid=' + localStorage.userid + '\')">'+ submenu[subkey]["tglsub"] + ' <i class="fal fa-arrow-right right"></i></a></li>';
                                                    }
                                                }
                                            datalist += '</ul>';
                                        datalist += '</div>';
                                    }
                                }
                                $("#load_data").append(datalist);
                                var coll = document.getElementsByClassName("headx");
                                var i;

                                for (i = 0; i < coll.length; i++) {
                                    coll[i].addEventListener("click", function() {
                                        this.classList.toggle("active");
                                        var content = this.nextElementSibling;
                                        //var contentx = this.previousElementSibling;
                                        if (content.style.display === "block") {
                                        content.style.display = "none";
                                        } else {
                                        content.style.display = "block";
                                        //contentx.style.display = "none";
                                        }
                                    });
                                }
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