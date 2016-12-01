
$(document).ready(function() {

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
          }
        }
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', 'http://prateekbhardwaj07.imad.hasura-app.io/Login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
	}


});

	
	



