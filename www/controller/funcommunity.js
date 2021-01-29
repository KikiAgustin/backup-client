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

	if (localStorage.lat == null && localStorage.long == null) {
		var onSuccess = function(position) {
			localStorage.lat=position.coords.latitude;
			localStorage.long=position.coords.longitude;
			location.reload(); 
		};
  
		// onError Callback receives a PositionError object
		//
		function onError(error) {
		}
	
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	} 
	
         var limit = 5;
         var start = 0;
         var action = 'inactive';
		 var datalist = "";
		 var lastid = "";        
		 function load_country_data(limit, start) {
			   var urls =base_url + "index.php/world/community/"+start+"/"+limit+"/"+localStorage.lat+"/"+localStorage.long+"///?callback=?";
			  	$.ajax({
				  type: "GET",
				  url: urls,
				  crossDomain: true,
				  cache: false,
				  success: function(data){
					  if(data['status']=="OK"){
						$("#sec").html(data['sub']);
							var datalist = "";
							var dl = data['datalist'];
							var jml = dl.length;
							if(jml>0) {
							    for (var key in dl) {
								if (dl.hasOwnProperty(key)) {
								  datalist += '<div class="blog-depan-card animated fadein delay-1 waves-effect" onclick="fade(\'funcommunity-read.html?action=read&id='+dl[key]["id"]+'\')" style="height:auto">';
								  datalist += '<div class="blog-depan-image"  style="height:auto"><a href="javascript:fade(\'funcommunity-read.html?action=read&id='+dl[key]["id"]+'\')"><img src="' + dl[key]["gambar"] + '" alt="" style="margin:15px 10px 15px 10px; width:90%; height:auto" /></a></div>';
								  datalist += '<div class="blog-depan-preview p-10" style="height:auto"><strong><a href="javascript:fade(\'funcommunity-read.html?action=read&id='+dl[key]["id"]+'\')">'+dl[key]["nama"]+'</a></strong><br>'+dl[key]["ringkas"]+'<br><br>'+dl[key]["km"]+'</div>';
								  datalist += '</div>';
							 
								}
							  }
							  $("#load_data").append(datalist);	
							  $('#load_data_message').html("");				
							} else {
								$("#load_data").html("<p style='text-align:center'>-- Data tidak ditemukan --</p>");	
							}
														
							if(datalist == '' || datalist == null){
								 $('#load_data_message').html("");
								 action = 'active';
							} else {
								 $('#load_data_message').html("<div class=\"loading\"><center><img src=\"img/loading.svg\" /></center></div>");
								 action = "inactive";
							}
					  }
				 }
			  });
		 }
		 
		 function load_country_data2(limit, start) {
			var urls =base_url + "index.php/world/community/"+start+"/"+limit+"/"+localStorage.lat+"/"+localStorage.long+"///?callback=?";
			   $.ajax({
			   type: "GET",
			   url: urls,
			   crossDomain: true,
			   cache: false,
			   success: function(data){
				   if(data['status']=="OK"){
					 $("#sec").html(data['sub']);
						 var datalist = "";
						 var dl = data['datalist'];
						 var jml = dl.length;
						 if(jml>0) {
							 for (var key in dl) {
							 if (dl.hasOwnProperty(key)) {
							   datalist += '<div class="blog-depan-card animated fadein delay-1 waves-effect" onclick="fade(\'funcommunity-read.html?action=read&id='+dl[key]["id"]+'\')" style="height:auto">';
							   datalist += '<div class="blog-depan-image"  style="height:auto"><a href="javascript:fade(\'funcommunity-read.html?action=read&id='+dl[key]["id"]+'\')"><img src="' + dl[key]["gambar"] + '" alt="" style="margin:15px 10px 15px 10px; width:90%; height:auto" /></a></div>';
							   datalist += '<div class="blog-depan-preview p-10" style="height:auto"><strong><a href="javascript:fade(\'funcommunity-read.html?action=read&id='+dl[key]["id"]+'\')">'+dl[key]["nama"]+'</a></strong><br>'+dl[key]["ringkas"]+'<br><br>'+dl[key]["km"]+'</div>';
							   datalist += '</div>';
						  
							 }
						   }
						   $("#load_data").append(datalist);					
						 } 
													 
						 if(datalist == '' || datalist == null){
							  $('#load_data_message').html("");
							  action = 'active';
						 } else {
							  $('#load_data_message').html("<div class=\"loading\"><center><img src=\"img/loading.svg\" /></center></div>");
							  action = "inactive";
						 }
				   }
			  }
		   });
	  	}
        
         if(action == 'inactive')
         {
			  action = 'active';
			  load_country_data(limit, start);
         }
        
		  $("#content").scroll(function(){
          if($("#content").scrollTop() + $("#content").height() > $("#load_data").height() && action == 'inactive')
          {
			   action = 'active';
			   start = start + limit;
			   setTimeout(function(){
				load_country_data2(limit, start);
			   }, 1000);
          }
	  });
});

function search() {
	if($('#search').is(':visible')){  
		document.getElementById("search").style.display = "none";
	} else {
		document.getElementById("search").style.display = "block";
	}
}

function searchx() {
	var sec = $("#sec").val();
	var key = $("#keyword").val();
	window.location.href = "funcommunity-search.html?sec="+sec+"&key="+key;
}