console.log('Loaded!');
var button =document.getElementById('counter');

button.onclick= function() {
    
    // create a request object
    var request=new XMLHttpRequest();
    
    //Capturew the response and store it in variable
    request.onreadystatechange= function(){
        if(request.readystate === XMLHttpRequest.DONE)
        {
            //take some action
            if(request.state === 200)
            {
                var counter=request.responseText;
                var span= document.getElementById('count');
                span.InnerHTML=counter.toString();
            }
        }
        // Not done yet
    };
    
    // Move the request
    request.open('GET','http://http://prateekbhardwaj07.imad.hasura-app.io/counter',true);
    request.send(null);
};