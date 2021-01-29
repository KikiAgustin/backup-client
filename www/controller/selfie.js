$(document).ready(function () {

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


    var urls = "https://www.dfunstation.com/api4/android/index.php/profile/profile/" + localStorage.userid + "/?callback=?";
    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                $("#img").attr("src", data['selfie']);
            }
        }
    });
});

$(document).ready(function () {
    //Kirim Function
    $("#kirim").click(function () {
        var isimage = $("#isimage").val();
        if (isimage != "1") {
            alert("Belum ada gambar yang dipilih");
            return false;
        }
        if (isimage == "1") {
            $("#img").show();
            $(".box-status1-post").show();
            $("#kirim").html('Mengirimkan...');
            //selected photo URI is in the src attribute (we set this on getPhoto)
            var imageURI = document.getElementById('img').getAttribute("src");
            if (!imageURI) {
                swal('Silahkan pilih photo atau ambil gambar dari kamera');
                return;
            }
            //set upload options
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.params = {
                status: status
            }
            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("https://www.dfunstation.com/api4/android/index.php/member/gantiavatar/selfie/" + localStorage.userid + "/" + imageURI + "/?callback=?"), win, fail, options);
        }

    });

    //
    function onFail(message) {
        console.log('Failed because: ' + message);
    }

    function win(r) {
        slide("tidakmampu.html");
    }

    function fail(error) {
        swal("Gagal mengupload gambar dan status = " + error.code);
    }

});

$(document).ready(function () {

    // Take photo from camera
    $('#but_take').click(function () {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            allowEdit: true,
            destinationType: Camera.DestinationType.FILE_URL
        });
    });

    // Select from gallery 
    $("#but_select").click(function () {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            destinationType: Camera.DestinationType.FILE_URI
        });
    });

    // Change image source
    function onSuccess(imageData) {
        var image = document.getElementById('img');
        $("#img").attr("src", imageData + '?' + Math.random());
        if (imageData !== "") {
            $("#img").show();
            $(".box-status1-post").show();
            //$(".box-status1-select").hide();

        }
        $("#isimage").val("1");
    }

    function onFail(message) {
        swal('Gagal mengambil gambar: ' + message);
    }

});