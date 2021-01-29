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
    var urls = base_url+"index.php/profile/profile/" + localStorage.userid + "/?callback=?";
    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                var d = new Date(),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;
                var dt = [year, month, day].join('-');

                var datalist = "";
                if (data['mitraid'] > "0") {
                    if (data['mitraid_until'] >= dt) {
                        datalist += '<div class="padding" style="margin:20px 0px 20px 0px;">';
                        datalist += 'Selamat, layanan School Counseling '+ data['mitraid_nama'] +' Anda sudah aktif sampai <strong>' + data['mitraid_tgl'] + '</strong>.';
                        datalist += '</div>';
                        datalist += '<a href="javascript:fade(\'school.html\')" class="waves-effect waves-light btn-large accent-color width-100 m-b-20 animated bouncein delay-4 button button-block button-positive">Claim Voucher</a>';
                    } else {
                        datalist += '<div class="padding" style="margin:20px 0px 20px 0px;">';
                            datalist += 'Layanan School Counseling '+ data['mitraid_nama'] +' Anda sudah expired pada <strong>' + data['mitraid_tgl'] + '</strong>.<br/>';
                            datalist += '<center> Silakan masukan kode Voucher Member Sekolah yang anda miliki:</center>';
                            datalist += '<div class="input-field">';
                                datalist += '<input class="validate" style="text-align:center; font-size:120%; font-weight:bold" id="voucherid" type="text" placeholder="Masukan Kode Voucher" required>';
                            datalist += '</div>';
                        datalist += '</div>';
                        datalist += '<button onClick="claimvoucher()" class="waves-effect waves-light btn-large accent-color width-100 m-b-20 animated bouncein delay-4 button button-block button-positive" id="lanjutkan">Claim Voucher</button>';
                    }
                } else {
                    datalist += '<div class="padding" style="margin:20px 0px 20px 0px;">';
                        datalist += '<center> Silakan masukan kode Voucher Member Sekolah yang anda miliki:</center>';
                        datalist += '<div class="input-field">';
                            datalist += '<input class="validate" style="text-align:center; font-size:120%; font-weight:bold" id="voucherid" type="text" placeholder="Masukan Kode Voucher" required>';
                        datalist += '</div>';
                    datalist += '</div>';
                    datalist += '<button onClick="claimvoucher()" class="waves-effect waves-light btn-large accent-color width-100 m-b-20 animated bouncein delay-4 button button-block button-positive" id="lanjutkan">Claim Voucher</button>';
                }

                $("#clm").html(datalist);
            }
        }
    });
});

function claimvoucher() {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";

    var text = $("#voucherid").val();
    var url = base_url + "index.php/member/sekolah/?callback=?";
    var dataString = "code=" + text + "&userid=" + localStorage.userid + "&login=";
    if ($.trim(text).length > 0) {
        $.ajax({
            type: "POST",
            url: url,
            data: dataString,
            crossDomain: true,
            cache: false,
            beforeSend: function () { 
                $("#lanjutkan").html('Melakukan Verifikasi...'); 
            },
            success: function (data) {
                var pesan = data['message'];
                var mitraid = data['mitraid'];
                if (!empty(mitraid)) localStorage.mitraid = mitraid;
                if (data['status'] == "OK") {
                    $("#scan").html('<div class="p-20"><center>' + pesan + '</center></div>');
                } else if (data['status'] == "ERROR") {
                    var datalist = "";
                    datalist += '<div class="p-20"><center>' + pesan + '</center></div>';
                    datalist += '<div class="padding" style="margin:20px 0px 20px 0px;">';
                        datalist += '<center> Silakan masukan kode Voucher Member Sekolah yang anda miliki:</center>';
                        datalist += '<div class="input-field">';
                            datalist += '<input class="validate" style="text-align:center; font-size:120%; font-weight:bold" id="voucherid" type="text" placeholder="Masukan Kode Voucher" required>';
                        datalist += '</div>';
                    datalist += '</div>';
                    datalist += '<button onClick="claimvoucher()" class="waves-effect waves-light btn-large accent-color width-100 m-b-20 animated bouncein delay-4 button button-block button-positive" id="lanjutkan">Claim Voucher</button>';
                    $("#scan").html(datalist);
                }
            }
        });
    }
    else {
        swal("Kode Voucher masih kosong, silahkan masukan");
    }

}