console.log('Loaded!');
// moving the image rught
var img=document.getElementById('madi');
var marginLeft=0;
function moveRight(){
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft +'px';
}
img.onclick = function(){
    var interval=(moveRight,50);
}
var elemnet=document.getElementById('text');
element.innerHTML="Inner Html Feature";