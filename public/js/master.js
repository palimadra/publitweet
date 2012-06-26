var MIN_TIME_BETWEEN_AJAX_REQUESTS = 1750;


var BASE_URL='http://'+window.location.host+'/';
var SITE_URL = BASE_URL + 'index.php/';

function pnotice(anchor,msg)
{
	if(anchor.substring(0,1)!='#')
		anchor = '#' + anchor;
	$(anchor).html(msg);
	$(anchor).fadeIn('slow');
}

function setWidgetMaxHeight(max_height)
{
	widget_height = $('#publitweet_wrapper').height();

	if(widget_height > max_height)
	{
		header_height = $('#publitweet_header').height();
		footer_height = $('#publitweet_footer').height();

		body_height = max_height - header_height - footer_height;
		$('#publitweet_body').css('overflow-y','scroll');
		$('#publitweet_body').css('height',body_height);
	}
}

function notice(anchor,msg)
{
	if(anchor.substring(0,1)!='#')
		anchor = '#' + anchor;
	$(anchor).html(msg);
	$(anchor).fadeIn('slow');
	func = "$('"+anchor+"').fadeOut('slow')";
	
	setTimeout(func,3000);
}

function debug(msg)
{
	if(window.console)
		console.info(msg);
}


$(document).ready(function() {

	$('.grabcode').focus(function() {
		$(this).select();
	});
	
});