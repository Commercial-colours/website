/* Author:

*/


$(document).ready(function(){
	
	// Run Matt Kersley's jQuery Responsive menu plugin (see plugins.js)
	if ($.fn.mobileMenu) {
		$('ol#id').mobileMenu({
			switchWidth: 768,                   // width (in px to switch at)
			topOptionText: 'Choose a page',     // first option text
			indentString: '&nbsp;&nbsp;&nbsp;'  // string for indenting nested items
		});
	}

	// Run Mathias Bynens jQuery placeholder plugin (see plugins.js)
	if ($.fn.placeholder) {
		$('input, textarea').placeholder();		
	}
});

$(function(){
	if($('#slider1 li').length > 0){
		
		$('#slider1').bxSlider({
			displaySlideQty: 3,
		infiniteLoop: true,
		hideControlOnEnd: false,
		auto: true
		  });
		
	}
});






