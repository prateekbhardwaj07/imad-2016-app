   
  

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

/*
$(window).on("scroll",function(){
	if(this.scrollTop()>= 150)
	{	
	$('#header').removeClass("topheader");
	$('#header').addClass('scrollheader');
	}
	else
	{	
	$('#header').removeClass("scrollheader");
	$('#header').addClass('topheader');
	}
});
*/
document.getElementById('New User').onclick = function(){
	location.href="http://prateekbhardwaj07.imad.hasura-app.io/form";
};
});

  
