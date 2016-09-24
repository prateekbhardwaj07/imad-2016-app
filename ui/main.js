console.log('Loaded!');
// moving the image rught
var img=document.getElementById('madi');
function moveRight(){
    marginLeft+=1;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick = function(){
    var interval=(moveRight,50);
}