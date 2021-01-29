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
});

function claimvoucher() {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";

    var text = $("#voucherid").val();
    var url = base_url + "index.php/member/claim/?callback=?";
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
                    $("#scan").html('<div class="p-20"><center>' + pesan + '</center></div>');
                }
            }
        });
    } else {
        swal("Kode Voucher masih kosong, silahkan masukan");
    }
}

function scanbarcode() {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var text = result.text;
            var url = base_url+"index.php/member/claim/?callback=?";
            var dataString = "code=" + text + "&userid=" + localStorage.userid + "&login=";
            if ($.trim(text).length > 0) {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: dataString,
                    crossDomain: true,
                    cache: false,
                    beforeSend: function () { $("#scanbtn").html('Melakukan Verifikasi...'); },
                    success: function (data) {
                        var pesan = data['message'];
                        var mitraid = data['mitraid'];
                        if (!empty(mitraid)) localStorage.mitraid = mitraid;
                        if (data['status'] == "OK") {
                            $("#scan").html('<div class="p-20"><center>' + pesan + '</center></div>');
                        } else if (data['status'] == "ERROR") {
                            $("#scan").html('<div class="p-20"><center>' + pesan + '</center></div>');
                        }
                    }
                });
            } return false;
        },
        function (error) {
            alert("Scanning Barcode gagal dilakukan : " + error);
        }
    );
}