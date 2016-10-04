console.log('Loaded!');
var button =document.getElementById('counter');

button.onclick = function() {

    // create a request object
    var request=new XMLHttpRequest();
    
    //Capturew the response and store it in variable
    request.onreadystatechange= function()
    {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status === 200)
            {
                var counter=request.responseText;
                var span= document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
        // Not done yet
    };
    
    // Move the request
    request.open('GET','http://prateekbhardwaj07.imad.hasura-app.io/counter',true);
    request.send(null);
};


var submit = document.getElementById('submit_btn');
submit.onclick = function() { 

    // create a request object
    var request=new XMLHttpRequest();
    
    //Capturew the response and store it in variable
    request.onreadystatechange= function()
    {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status === 200)
            {
                 //Make request to server to send the names
                                        
                    
                  //capture a list of names and render it as list
                     var names = request.responseText;
                     names = JSON.parse(names);
                     var list='';
                
                     for(var i=0; i< names.length; i++){
                                  list += '<li>' + names[i] + '</li>';
                             }
                     var ul = document.getElementById('namelist');
                     ul.innerHTML=list;
                         
             }
        }
        // Not done yet
    };
    
    var nameInput = document.getElementById('name');
     var name = nameInput.value;
    // Move the request
    request.open('GET','http://prateekbhardwaj07.imad.hasura-app.io/submit-name?name=' + name ,true);
    request.send(null);
};
   