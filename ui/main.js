console.log('Loaded!');
var element=document.getElementById('text/madi');
element.innerHTML='Inner Html Feature';

// moving the image rught
var img=document.getElementById('madi');
/*var marginLeft=0;
function moveRight(){
    marginLeft = marginleft + 5;
    img.style.marginLeft = marginLeft + 'px';
}*/
img.onclick = function(){
    //var interval = (moveRight , 50);
    img.style.marginLeft = '100px';
};
