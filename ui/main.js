
$(document).ready(function() {
    
 $('a[href*=#]').each(function() {
     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
     && location.hostname == this.hostname
     && this.hash.replace(/#/,'') ) {
     var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
     var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
    if ($target){
                    var targetOffset = $target.offset().top;
                    $(this).click(function()
                    {
                    $("#nav li a").removeClass("active");
                    $(this).addClass('active');
                    $('html, body').animate({scrollTop: targetOffset}, 1000);
                    return false;
                    });
                }
     }
 });

document.getElementById('New User').onclick = function(){
	location.href="http://prateekbhardwaj07.imad.hasura-app.io/form";
}

		var login =document.getElementById('login-btn');
		login.onclick = function(){
		 var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function ()
		{
          if (request.readyState === XMLHttpRequest.DONE)
			  {
              // Take some action
              if (request.status === 200) {
                  alert('User Logged In Sucessfully');
              }
              else if(request.status === 403) {
                  alert('Invalid Username/Password Value');
              }
              else if(request.status === 500)
              {
                  alert('Something  Occured On Server');
              }
              else
              {
                  alert('Unknown Error Occured');
              }
          }
        }
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/Login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
	}


});

	
	



