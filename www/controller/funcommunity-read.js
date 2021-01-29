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
	
	var id = getvar("id");
	var urls =base_url+"index.php/world/read/"+id+"/"+localStorage.lat+"/"+localStorage.long+"/?callback=?";

	$.ajax({
		type: "GET",
		url: urls,
		crossDomain: true,
		cache: false,
		success: function(data){
			
			var datalist;
			
			datalist = "";
			
			if(data['status']=="OK")
			{
				datalist += '<div class="blog-fullwidth animated fadein delay-1">';
				datalist += '<div class="blog-image"><img src="' + data['detailgambar'] + '" alt="" /></div> <div class="tabs"><div class="tab tab-active" onClick="javascript:fade(\'funcommunity-read.html?id='+id+'\');">Profile</div><div class="tab" onClick="javascript:fade(\'belivoucher.html?id='+id+'\');">Beli Voucher</div></div>';

				datalist += '<div class="blog-preview p-20"><h4><strong>'+data["detailnama"]+'</strong></h4></p>';
				datalist += '<p><br>'+data["detaillengkap"]+'</p>';
				datalist += '<div class="training-preview p-10" style="font-size:16px;"><strong>Lokasi dan Alamat</strong></div><br>';
				datalist += '<p><br>'+data["detailalamat"]+'</p>';
				datalist += '<p>'+data["km"]+'</p>';
				
				var dl = data['detailpage'];
				
				var jml = dl.length;
				  
			  
				  if(jml>0)
				  {

					for (var key in dl) {
					  if (dl.hasOwnProperty(key)) {
						datalist += '<div class="training-preview p-10" style="font-size:16px;"><strong>'+dl[key]["nama"]+'</strong></div><br>';
						datalist += '<div class="blog-depan-preview p-10">'+dl[key]["ringkas"]+'</div>';
						datalist += '<br>';
				   
					  }
					}
											  
				  }
				
				var dl = data['detailgaleri'];
				
				var jml = dl.length;
				  
			  
				  if(jml>0)
				  {
				  datalist += '<div class="training-preview p-10" style="font-size:16px;"><strong>Galeri Photo</strong></div><br>';
					for (var key in dl) {
					  if (dl.hasOwnProperty(key)) {								
						datalist += '<div class="card-image p-10"><img src="' + dl[key]["gambar"] + '" alt="" /><br><b>'+dl[key]["nama"]+'</b><br>'+dl[key]["ringkas"]+'</div>';
						datalist += '';
				   
					  }
					}
											  
				  }
				
				
				
				datalist += "<br><br><a class=\"btn btn-default btn-block\" href=\"javascript:window.plugins.socialsharing.share('"+data['detailnama']+" - "+data['detailringkas']+"',null, null, '"+data['detailurl']+"')\"><i class=\"fal fa-share\"></i>&nbsp;&nbsp;Share</a>";
				datalist += '</div></div>';						
				$("#bloglist").append(datalist);
				delete(datalist);
				  
			}
		   
		}
	});
});