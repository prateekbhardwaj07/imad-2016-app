
// handle the form submit event
function prepareEventHandlers() {
	{  
	
	document.getElementById("Rform").onsubmit = function() {
		
		var mailformat =/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

		// prevent a form from submitting if no email.
		if (document.getElementById('email').value == "") {
			alert(" Please provide an email address!");  		
			// to STOP the form from submitting
			return false;
		}

		else if(document.getElementById('email').value.match(mailformat) == false)  
		{    
		document.form.email.focus();  
		document.getElementById("errorMessage").innerHTML = "Please provide Valid  Email address!";
		return false;  
		}  


		else {
			// reset and allow the form to submit
			document.getElementById("errorMessage").innerHTML = "";
			return true;
		}
	};
}/*
function validateForm()  
if (x == "") {
			alert(" Please provide an email address!");  		
			// to STOP the form from submitting
			return false;
		 
};*/

// when the document loads
$(document).ready(function(){
		prepareEventHandlers();
});

