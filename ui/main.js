console.log('Loaded!');
// moving the image rught
var img=document.getElementById('madi');
var marginleft=0;
function moveRight(){
    marginleft = marginleft + 5;
    img.style.marginLeft = marginleft + 'px';
}
img.onclick = function(){
    var interval = (moveRight , 50);
};
var element=document.getElementById('text/madi');
element.innerHTML='Inner Html Feature';