jQuery(document).ready(function($){

	jQuery("[name='bcountry']").attr('id', 'bcountry');
	
    jQuery('#bstate').replaceWith('<select id="bstate" name="bstate"></select>');  //convert to dropdown so states can auto-populate   

    populateCountries('bcountry', 'bstate');  

    //load defaults from user meta.
    jQuery('#bcountry').val(test_object.country_selected);
    jQuery('#bstate').val(test_object.state_selected);

});

