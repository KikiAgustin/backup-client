function getvar(name,url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
}


//Chat
var instanse = false;
var state;
var mes;
var file;
var name = "adisumaryadi";
var userid = getvar("userid");
var chatid = getvar("chatid");

localStorage.lastchatid = 0;

function Chat () {
	this.update = updateChat;
	this.send = sendChat;
	this.getState = getStateOfChat;
}
//gets the state of the chat
function getStateOfChat() {
	if(!instanse){
		instanse = true;
		$.ajax({
			type: "POST",
			crossDomain: true,
			cache: false,
			url: "https://www.dfunstation.com/api4/android/index.php/member/peerchat/"+userid+"/"+localStorage.userid+"//"+chatid+"/?callback=?",
			data: {'function': 'getState', 'file': file},
			success: function(data) 
			{ 
				state = data.state;
				instanse = false;
			}
		});
	}	
}

//Updates the chat
function updateChat() {

	if(!instanse){
		instanse = true;
		$.ajax({
			type: "POST",
			crossDomain: true,
			cache: false,
			url: "https://www.dfunstation.com/api4/android/index.php/member/peerchat/"+userid+"/"+localStorage.userid+"/"+localStorage.lastchatid+"/"+chatid+"/?callback=?",
			data: {'function': 'update','state': state,'file': file},
			success: function(data) {
				if(data.text)
				{
					//if(localStorage.lastchatid==0){ $(".loading").remove(); }
					
					for (var i = 0; i < data.text.length; i++) {
						var datax = data.text[i];
						var ids = datax.id;
						var pesan = datax.pesan;
						$('#chat-area').append($(""+ pesan +""));
						localStorage.lastchatid = ids;
						
						var finish = datax.finish;
						if(finish>0)
						{
							slide("peer-chat-finish.html?action=read&chatid="+chatid);
						}
					}	
				}
				if(data.text.length>0) document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
				instanse = false;
				state = data.state;
			}
		});
	}
	else {
		setTimeout(updateChat, 2000);
	}
}

//send the message
function sendChat(message, nickname) { 
	updateChat();
	$.ajax({
		type: "POST",
		crossDomain: true,
		cache: false,
		url: "https://www.dfunstation.com/api4/android/index.php/member/peerchat/"+userid+"/"+localStorage.userid+"//"+chatid+"/?callback=?",
		data: {'function': 'send','message': message,'nickname': nickname,'file': file},
		success: function(data){
			updateChat();
			
		}
	});
}

$(document).ready(function() {
	
	//Chat
	// kick off chat
 	 var chat =  new Chat();

	  $(function() {
	  
		 chat.getState(); 
		 
		 // watch textarea for key presses
		 $("#sendie").keydown(function(event) {  
		 
			 var key = event.which;  
	   
			 //all keys including return.  
			 if (key >= 33) {
			   
				 var maxLength = $(this).attr("maxlength");  
				 var length = this.value.length;  
				 
				 // don't allow new content if length is maxed out
				 if (length >= maxLength) {  
					 event.preventDefault();  
				 }  
			 }  
		 });
		 // watch textarea for release of key press
		 $('#sendie').keyup(function(e) {  
			if (e.keyCode == 13) { 
				  var text = $(this).val();
				  var maxLength = $(this).attr("maxlength");  
				  var length = text.length; 
				   
				  // send 
				  if (length <= maxLength + 1) { 
					
					chat.send(text, name);  
					$(this).val("");
				  } else {
					$(this).val(text.substring(0, maxLength));
				  }  
			}
		 });
	  });
  
	
	setInterval(function()
	{ 
		chat.update(); 
	}, 2000);
	//setInterval('chat.update()', 3000);					 
});
  


var browser = window.navigator.userAgent;
var isandroid = browser.indexOf("Android");

function fade(href)
{
	  window.location.href= href;
}
function slide(href) {
	window.location.href= href;
}


function logout()
{
	localStorage.removeItem('login');
	localStorage.removeItem('email');
	localStorage.removeItem('userid');
	localStorage.removeItem('userfullname');
	localStorage.removeItem('avatar');
	localStorage.removeItem('deviceid');
	localStorage.clear();
	slide("login.html");
}

function loading(id,jml)
{
	var content = '<div class="p-20"><div class="animated-background facebook"><div class="background-masker header-top"></div><div class="background-masker header-left"></div><div class="background-masker header-right"></div><div class="background-masker header-bottom"></div><div class="background-masker subheader-left"></div><div class="background-masker subheader-right"></div><div class="background-masker subheader-bottom"></div><div class="background-masker content-top"></div><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div></div>';
	
	var contents = "";
	for(i=1;i<jml;i++)
	{
		contents += content;
	}
	$("#"+id).html(contents);
}

function loading1(id,jml)
{
	var content = '<div class="p-20"><div class="animated-background1 facebook"><div class="background-masker1 header-top"></div><div class="background-masker1 header-left"></div><div class="background-masker1 header-right"></div><div class="background-masker1 header-bottom"></div><div class="background-masker1 subheader-left"></div><div class="background-masker1 subheader-right"></div><div class="background-masker1 subheader-bottom"></div><div class="background-masker1 content-top"></div><div class="background-masker1 content-first-end"></div><div class="background-masker1 content-second-line"></div><div class="background-masker1 content-second-end"></div><div class="background-masker1 content-third-line"></div><div class="background-masker1 content-third-end"></div></div></div>';
	
	var contents = "";
	for(i=1;i<jml;i++)
	{
		contents += content;
	}
	$("#"+id).html(contents);

}
function loadingdetail(id)
{
	var content = '<div class="p-20"><div class="animated-background facebook"><div class="background-masker header-top"></div><div class="background-masker header-left"></div><div class="background-masker header-right"></div><div class="background-masker header-bottom"></div><div class="background-masker subheader-left"></div><div class="background-masker subheader-right"></div><div class="background-masker subheader-bottom"></div><div class="background-masker content-top"></div><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div></div>';
	$("#"+id).html(content);
}
function loadingbar(id)
{
	var content = '<div class="p-20"><div class="animated-background facebook"><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div></div>';
	$("#"+id).html(content);
}
function loadingmatch(id,jml)
{
	var content = '<div class="loading-wrapper"><div class="loading-wrapper-cell"><div class="loading-text"><div class="loading-text-line"> </div><div class="loading-text-line"></div></div></div></div>';
	var contents = "";
	for(i=0;i<jml;i++)
	{
		contents += content;
	}
	$("#"+id).html(contents);

}
$(function() {
	FastClick.attach(document.body);
});

function removeOptions(selectbox,text)
{
	var i;
	for(i=selectbox.options.length-1;i>=0;i--)
	{
		selectbox.remove(i);
	}
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = "";
	selectbox.options.add(optn);
}

function addOption(selectbox,text,value )
{
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}


