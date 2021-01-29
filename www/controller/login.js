$(document).ready(function () {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";

    //Check Login
    if (localStorage.tour == "" || localStorage.tour == null) {
        window.location.href = "tour.html";
    }
    var userid = localStorage.userid;

    if (userid != null && userid != "undefined") {
        slide("index.html");
    }

	var url= base_url+"index.php/member/login/?callback=?";
    
    //Login Function
    $("#login").click(function(){						   
	   var email=$("#username").val();
       var password=$("#password").val();
	  /* window.FirebasePlugin.getToken(function(token)
	   {
		  localStorage.deviceid = token;
	   },function(error)
	   {
		 // swal(error);
	   });
		
		var devices = device.model; 
    	var dataString="username="+email+"&password="+password+"&deviceid="+localStorage.deviceid+"&device="+devices+"&fromapps=1";
		
		///**/ var dataString="username="+email+"&password="+password+"&deviceid="+localStorage.deviceid;
		
		if($.trim(email).length<3){ swal("Email masih kosong atau terlalu pendek"); }
		if($.trim(password).length<3){ swal("Password masih kosong atau terlalu pendek"); }
    	
		if($.trim(email).length>0 & $.trim(password).length>0){
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ 
                    $("#main-login").LoadingOverlay("show");
                    $("#login").html('Menyambungkan...');
                },
				success: function(data){					
					if(data['status']=="OK"){
						var userid = data['userid'];
						var userfullname = data['userfullname'];
						var avatar = data['avatar'];
						var usertipe = data['usertipe'];
						var peer = data['peer'];
						var mitraid = data['mitraid'];
						var verification_need = data['verification'];
						var verification = data['verification'];
						var verification_until = data['verification_until'];
						var usia18 = data['usia18'];
                        
                        //Set Local Storage
						localStorage.login="true";
						localStorage.email=email;
						localStorage.userid=userid;
						localStorage.userfullname=userfullname;
						localStorage.avatar=avatar;
						localStorage.usertipe = usertipe;
						localStorage.peer = peer;
						localStorage.mitraid = mitraid;
						localStorage.verification_need = verification_need;
						localStorage.verification = verification;
						localStorage.verification_until = verification_until;
						localStorage.usia18 = usia18;
						localStorage.tour = "true";
                        
                        // Go!
                        //$("#main-login").LoadingOverlay("hide");
						slide("index.html");
					} else if(data['status']=="ERROR") {
                        $("#main-login").LoadingOverlay("hide");
						swal(data['message']);
						$("#login").html('Login');
					}
				}
			});
        }
        return false;
    });
})

// Scroll Loaded
var myScroll;
function loaded() {
    myScroll = new IScroll('#content', { mouseWheel: true });
}

// See Password
function SeePass() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}