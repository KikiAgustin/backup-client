$(document).ready(function () {

	//Change Password
	$("#change_password").click(function () {
		var email = localStorage.email;
		var old_password = $("#old_password").val();
		var new_password = $("#new_password").val();
		var dataString = "old_password=" + old_password + "&new_password=" + new_password + "&email=" + email + "&change_password=";
		if ($.trim(old_password).length > 0 & $.trim(old_password).length > 0) {
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function () { $("#change_password").val('Connecting...'); },
				success: function (data) {
					swal(data);
					if (data == "incorrect") {
						swal("Your old password is incorrect");
					}
					else if (data = "success") {
						swal("Password Changed successfully");
					}
					else if (data = "failed") {
						swal("Something Went wrong");
					}
				}
			});
		} return false;

	});



	//logout function
	$("#logout").click(function () {
		localStorage.login = "";
		localStorage.email = "";
		localStorage.userid = "";
		slide("login.html");
	});


});