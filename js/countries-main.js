jQuery(document).ready(function($){
	//for compatibility with older PMPro, make sure bcountry fields have ids
	jQuery("[name='bcountry']").attr('id', 'bcountry');

	//make sure we have a bcountry field to work with
	if(jQuery('#bcountry').length) {		
		jQuery('#bstate').replaceWith('<select id="bstate" name="bstate"></select>');  //convert to dropdown so states can auto-populate   

		populateCountries('bcountry', 'bstate');  

		//load defaults from user meta.
		jQuery('#bcountry').val(pmpro_state_dropdowns.country_selected);
		jQuery('#bstate').val(pmpro_state_dropdowns.state_selected);
	}
	
	//pmpro-shipping support
	if(jQuery('#scountry').length) {
		jQuery('#sstate').replaceWith('<select id="sstate" name="sstate"></select>');  //convert to dropdown so states can auto-populate   

		populateCountries('scountry', 'sstate');  

		//load defaults from user meta.
		jQuery('#scountry').val(pmpro_state_dropdowns.scountry);
		jQuery('#sstate').val(pmpro_state_dropdowns.sstate);
	}
});

