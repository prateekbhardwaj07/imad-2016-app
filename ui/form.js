

// handle the form submit event
function prepareEventHandlers()
 {
	document.getElementById('Rform').onsubmit = function()
	{
	    
			var x=document.getElementById("email").value;
			var y=x.indexOf("@");
			var z=x.lastIndexOf(".");
			// prevent a form from submitting if no email.
			if ( x === "")
			{
				document.getElementById("errorMessage").innerHTML = "Please provide at least an email address!";
				// to STOP the form from submitting
				return false;
			}
			else if(y<1 ||z<y+2 ||z+2>=x.length)
			{ 
				// reset and allow the form to submit
				document.getElementById("errorMessage").innerHTML = "Please provide at least valid email address!";
				return false;
			}
			else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x) === false)
			{
				document.getElementById("errorMessage").innerHTML = "Please provide Valid  email address!";
				return false;
			}
			else
			{
				var password1 = String(document.getElementById('password').value);
				var password2 = String(document.getElementById('password2').value);
				if(password1.length === 0 ||password2.length === 0)
				{
					alert("Please Enter a password");
					return false;
				}
				else if(password1.length <= 6)
				{
					alert("Please Enter more than 6 characters");
					return false;
				}
				else if(password1 != password2){
					alert("please enter same passwords");
					return false;
				}
				else
				{
				    createUser();
				     return true;
				}
			}
		}
    			
    		function createUser(){
    		var register=document.getElementById('submitBtn');
    		register.onclick = function(){
    		 var request = new XMLHttpRequest();
            
            // Capture the response and store it in a variable
            request.onreadystatechange = function ()
    		{
              if (request.readyState === XMLHttpRequest.DONE)
    			  {
                  // Take some action
                  if (request.status === 200) {
                      alert('User created successfully');
                      register.value = 'Registered!';
                  } else {
                      alert('Could not register the user');
                      register.value = 'Register';
                  }
              }
            }
            
            // Make the request
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            request.open('POST', '/create-user', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({username: username, password: password}));  
            register.value = 'Registering...';
    	}
    }

		
 }
	
//
$(document).ready(function(){
   // prepareEventHandlers();
    createUser();
    
});


