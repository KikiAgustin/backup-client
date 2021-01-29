$(document).ready(function () {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";

    //Check Login
    //if (localStorage.tour == "" || localStorage.tour == null) {
        //window.location.href = "tour.html";
    //}
    var userid = localStorage.userid;

    if (userid != null && userid != "undefined") {
        slide("index.html");
	}
	
	$( "#userbirth" ).dateDropper({
		animate: true,
	  
		// bounce, dropDown
		init_animation: "fadein", 
		format: "Y-m-d",
		lang: "en",
	  
		// Set the initial value to current date or lock the control value to current date
		// false(default), from, to.
		lock: false,
		maxYear: new Date().getFullYear(),
		minYear: 1970,
		yearsRange: 10,
	  
		//CSS PRIOPRIETIES
		dropPrimaryColor: "#01CEFF",
		dropTextColor: "#333333",
		dropBackgroundColor: "#FFFFFF",
		dropBorder: "1px solid #08C",
		dropBorderRadius: 8,
		dropShadow: "0 0 10px 0 rgba(0, 136, 204, 0.45)",
		dropWidth: 124,
		dropTextWeight: 'bold'
	  });
    
    //Register Function
    $("#signup").click(function(){
		var urls=base_url+"index.php/member/register/?callback=?";
    	var username=$("#username").val();
		var fullname=$("#userfullname").val();
    	var email=$("#useremail").val();
    	var password=$("#userpassword").val();
        var phone=$("#userphonegsm").val();
        var birth=$("#userbirth").val();
		//var usia18=$("#usia18").val();
		var usia18= document.getElementById("usia18_");
	/*	
	   window.FirebasePlugin.getToken(function(token)
	   {
		  localStorage.deviceid = token;
	   },function(error)
	   {
		 // swal(error);
	   });
		
		var devices = device.model; */
		
		var devices = "";
        
        if($.trim(username).length<3){ 
            swal("Username masih kosong atau terlalu pendek"); 
        }

        if($.trim(fullname).length<3){ 
            swal("Nama Lengkap masih kosong atau terlalu pendek"); 
        }

        if($.trim(birth).length<1){ 
            swal("Tanggal Lahir masih kosong atau salah pengetikan"); 
        }

		if($.trim(useremail).length<3){ 
            swal("Email masih kosong atau terlalu pendek"); 
        }
		if($.trim(password).length<3){ 
            swal("Password masih kosong atau terlalu pendek"); 
		}

		var dataString="username="+username+"&userfullname="+fullname+"&useremail="+email+"&userpassword="+password+"&userphonegsm="+phone+"&birth="+birth+"&deviceid="+localStorage.deviceid+"&device="+devices+"&fromapps=1";

		const date1 = new Date(birth);
		const date2 = Date.now();
		const diffTime = Math.abs(date2 - date1);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
		const diffYears = diffDays / 365; 
		if(diffYears < 18) {
			if(usia18.checked == false){ 
				swal("Anda belum memilih cheklist bila Anda kurang dari 18 tahun"); 
			} else {
				if($.trim(username).length>0 && $.trim(fullname).length>0 && $.trim(email).length>0 && $.trim(password).length>0){
					$.ajax({
						type: "POST",
						url: urls,
						data: dataString,
						crossDomain: true,
						cache: false,
						beforeSend: function(){ 
							//$("#main-login").LoadingOverlay("show");
							$("#signup").val('Mendaftar...');
						},
						success: function(data){
							if(data['status']=="OK"){
								//$("#main-login").LoadingOverlay("hide");
								swal(data['message'], {
									buttons: {
										//cancel: "Lain Kali",
										catch: {
										text: "Selesai",
										value: "catch",
										}
									},
									closeOnClickOutside: false,
									closeOnEsc: false,
									allowOutsideClick: false,
									})
									.then((value) => {
										switch (value) {
											case "catch":	
												//slide("tour.html"); 
												//slide("claim.html");
												slide("login.html");
											break;
											default:
										}
									}); 
							} else if(data['status']=="ERROR") {
								//$("#main-login").LoadingOverlay("hide");
								swal(data['message']);
								$("#signup").val('Daftar Sekarang');
							}
						}
					});
				}return false; 
			}
		} else {
			if($.trim(username).length>0 && $.trim(fullname).length>0 && $.trim(email).length>0 && $.trim(password).length>0){
				$.ajax({
					type: "POST",
					url: urls,
					data: dataString,
					crossDomain: true,
					cache: false,
					beforeSend: function(){ 
						//$("#main-login").LoadingOverlay("show");
						$("#signup").val('Mendaftar...');
					},
					success: function(data){
						if(data['status']=="OK"){
							//$("#main-login").LoadingOverlay("hide");
							swal(data['message'], {
								buttons: {
									//cancel: "Lain Kali",
									catch: {
									text: "Selesai",
									value: "catch",
									}
								},
								closeOnClickOutside: false,
								closeOnEsc: false,
								allowOutsideClick: false,
								})
								.then((value) => {
									switch (value) {
										case "catch":	
											//slide("tour.html"); 
											//slide("claim.html");
											slide("login.html");
										break;
										default:
									}
								}); 	
						} else if(data['status']=="ERROR") {
							//$("#main-login").LoadingOverlay("hide");
							swal(data['message']);
							$("#signup").val('Daftar Sekarang');
						}
					}
				});
			}return false; 
		}

    });
})

// Scroll Loaded
var myScroll;
function loaded() {
    myScroll = new IScroll('#content', { mouseWheel: true });
}

// See Password
function SeePass() {
    var x = document.getElementById("userpassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function dob(elem) {
	const date1 = new Date(elem);
	const date2 = Date.now();
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
	const diffYears = diffDays / 365; 
	if(diffYears > 18) {
		$("#chk").hide();
	} else {
		$("#chk").show();
	}
	//alert(diffYears);
}